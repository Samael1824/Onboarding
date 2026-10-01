namespace Onboarding.Api.Dtos;

public record RegisterRequest(string Email, string Password, string FullName);
public record LoginRequest(string Email, string Password);

public record AuthResponse(string Token, Guid UserId, string Email, string FullName);
