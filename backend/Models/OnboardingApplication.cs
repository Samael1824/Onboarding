namespace Onboarding.Api.Models;

public class OnboardingApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ApplicationNumber { get; set; } = string.Empty;

    public Guid UserId { get; set; }
    public User? User { get; set; }

    public string CountryCode { get; set; } = string.Empty;
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Draft;

    /// <summary>0-100, recalculado cada vez que se guarda el formulario.</summary>
    public int ProgressPercentage { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public CompanyProfile? CompanyProfile { get; set; }
}
