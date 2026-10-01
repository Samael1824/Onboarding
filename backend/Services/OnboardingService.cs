using Microsoft.EntityFrameworkCore;
using Onboarding.Api.Data;
using Onboarding.Api.Dtos;
using Onboarding.Api.Models;

namespace Onboarding.Api.Services;

public interface IOnboardingService
{
    Task<ApplicationResponse> CreateApplicationAsync(Guid userId, CreateApplicationRequest request, CancellationToken ct);
    Task<List<ApplicationResponse>> GetMineAsync(Guid userId, CancellationToken ct);
    Task<ApplicationResponse> GetSummaryAsync(Guid userId, Guid applicationId, CancellationToken ct);
    Task<CompanyProfileDto> GetCompanyProfileAsync(Guid userId, Guid applicationId, CancellationToken ct);
    Task<ApplicationResponse> SaveCompanyProfileAsync(Guid userId, Guid applicationId, CompanyProfileDto dto, CancellationToken ct);
}

public class OnboardingService : IOnboardingService
{
    private readonly AppDbContext _db;

    public OnboardingService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<ApplicationResponse> CreateApplicationAsync(Guid userId, CreateApplicationRequest request, CancellationToken ct)
    {
        var countryCode = request.CountryCode.Trim().ToUpperInvariant();
        var year = DateTime.UtcNow.Year;

        var countThisYear = await _db.Applications
            .CountAsync(a => a.CountryCode == countryCode && a.CreatedAt.Year == year, ct);

        var application = new OnboardingApplication
        {
            UserId = userId,
            CountryCode = countryCode,
            ApplicationNumber = $"{countryCode}-{year}-{(countThisYear + 1):D6}",
            Status = ApplicationStatus.Draft,
        };

        _db.Applications.Add(application);
        await _db.SaveChangesAsync(ct);

        return ToResponse(application);
    }

    public async Task<List<ApplicationResponse>> GetMineAsync(Guid userId, CancellationToken ct)
    {
        var applications = await _db.Applications
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.UpdatedAt)
            .ToListAsync(ct);

        return applications.Select(ToResponse).ToList();
    }

    public async Task<ApplicationResponse> GetSummaryAsync(Guid userId, Guid applicationId, CancellationToken ct)
    {
        var application = await GetOwnedApplicationAsync(userId, applicationId, ct);
        return ToResponse(application);
    }

    public async Task<CompanyProfileDto> GetCompanyProfileAsync(Guid userId, Guid applicationId, CancellationToken ct)
    {
        var application = await GetOwnedApplicationAsync(userId, applicationId, ct);

        var profile = await _db.CompanyProfiles
            .FirstOrDefaultAsync(p => p.ApplicationId == application.Id, ct);

        // Si aún no se ha guardado nada, se devuelve un DTO vacío -- el
        // frontend lo trata igual que un formulario nuevo.
        return profile is null ? new CompanyProfileDto() : CompanyProfileMapper.ToDto(profile);
    }

    public async Task<ApplicationResponse> SaveCompanyProfileAsync(Guid userId, Guid applicationId, CompanyProfileDto dto, CancellationToken ct)
    {
        var application = await GetOwnedApplicationAsync(userId, applicationId, ct);

        var profile = await _db.CompanyProfiles
            .FirstOrDefaultAsync(p => p.ApplicationId == application.Id, ct);

        if (profile is null)
        {
            profile = new CompanyProfile { ApplicationId = application.Id };
            _db.CompanyProfiles.Add(profile);
        }

        CompanyProfileMapper.ApplyDto(profile, dto);

        application.ProgressPercentage = CompanyProfileMapper.CalculateProgress(profile);
        application.UpdatedAt = DateTime.UtcNow;
        if (application.Status == ApplicationStatus.Draft)
        {
            application.Status = ApplicationStatus.InProgress;
        }

        await _db.SaveChangesAsync(ct);

        return ToResponse(application);
    }

    private async Task<OnboardingApplication> GetOwnedApplicationAsync(Guid userId, Guid applicationId, CancellationToken ct)
    {
        var application = await _db.Applications.FirstOrDefaultAsync(a => a.Id == applicationId, ct)
            ?? throw new NotFoundException("La solicitud no existe.");

        if (application.UserId != userId)
        {
            // No se distingue "no existe" de "no es tuya" en el mensaje para
            // no filtrar información (mitigación básica de IDOR).
            throw new ForbiddenException("La solicitud no existe.");
        }

        return application;
    }

    private static ApplicationResponse ToResponse(OnboardingApplication a) => new(
        a.Id, a.ApplicationNumber, a.CountryCode, a.Status.ToString(), a.ProgressPercentage, a.CreatedAt, a.UpdatedAt);
}
