namespace Onboarding.Api.Dtos;

public record CreateApplicationRequest(string CountryCode);

public record ApplicationResponse(
    Guid ApplicationId,
    string ApplicationNumber,
    string CountryCode,
    string Status,
    int ProgressPercentage,
    DateTime CreatedAt,
    DateTime UpdatedAt);
