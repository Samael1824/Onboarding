using Microsoft.EntityFrameworkCore;
using Onboarding.Api.Data;
using Onboarding.Api.Dtos;
using Onboarding.Api.Models;

namespace Onboarding.Api.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken ct);
    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct);
}

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly ITokenService _tokenService;

    public AuthService(AppDbContext db, ITokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var alreadyExists = await _db.Users.AnyAsync(u => u.Email == email, ct);
        if (alreadyExists)
        {
            throw new ConflictException("Ya existe una cuenta registrada con este correo.");
        }

        var user = new User
        {
            Email = email,
            FullName = request.FullName.Trim(),
            PasswordHash = PasswordHasher.Hash(request.Password),
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync(ct);

        var token = _tokenService.GenerateToken(user);
        return new AuthResponse(token, user.Id, user.Email, user.FullName);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == email, ct);

        if (user is null || !PasswordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Correo o contraseña incorrectos.");
        }

        var token = _tokenService.GenerateToken(user);
        return new AuthResponse(token, user.Id, user.Email, user.FullName);
    }
}
