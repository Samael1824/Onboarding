using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Onboarding.Api.Models;

namespace Onboarding.Api.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}

/// <summary>
/// Emite JWT firmados con una clave simétrica configurada en appsettings
/// (Jwt:Key). PUNTO PENDIENTE: en producción esto debe reemplazarse por un
/// proveedor de identidad corporativo real (Azure AD, Keycloak,
/// IdentityServer, etc.) -- ver nota en Program.cs. Esta implementación es
/// funcional pero deliberadamente simple para esta fase.
/// </summary>
public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("fullName", user.FullName),
        };

        var expiresMinutes = int.Parse(_configuration["Jwt:ExpiresMinutes"] ?? "120");

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
