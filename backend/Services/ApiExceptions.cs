namespace Onboarding.Api.Services;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}

public class ConflictException : Exception
{
    public ConflictException(string message) : base(message) { }
}

/// <summary>Acceso a un recurso que no pertenece al usuario autenticado (IDOR).</summary>
public class ForbiddenException : Exception
{
    public ForbiddenException(string message) : base(message) { }
}
