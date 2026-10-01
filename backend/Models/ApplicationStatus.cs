namespace Onboarding.Api.Models;

/// <summary>
/// Estados del ciclo de vida de una solicitud. Se guarda como texto en la
/// base de datos (más legible en la tabla que un número de enum).
/// </summary>
public enum ApplicationStatus
{
    Draft,
    InProgress,
    ReadyForReview,
    Submitted,
    UnderReview,
    RequiresChanges,
    Approved,
    Rejected,
}
