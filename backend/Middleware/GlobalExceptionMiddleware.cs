using System.Net;
using Microsoft.AspNetCore.Mvc;
using Onboarding.Api.Services;

namespace Onboarding.Api.Middleware;

/// <summary>
/// Único punto donde las excepciones se convierten en respuestas HTTP.
/// Nunca se devuelve un stack trace al cliente.
/// </summary>
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = context.TraceIdentifier;
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            await WriteProblem(context, HttpStatusCode.NotFound, "No encontrado", ex.Message, correlationId);
        }
        catch (ForbiddenException ex)
        {
            _logger.LogWarning("Acceso denegado. CorrelationId: {CorrelationId}", correlationId);
            await WriteProblem(context, HttpStatusCode.NotFound, "No encontrado", ex.Message, correlationId);
        }
        catch (ConflictException ex)
        {
            await WriteProblem(context, HttpStatusCode.Conflict, "Conflicto", ex.Message, correlationId);
        }
        catch (UnauthorizedAccessException ex)
        {
            await WriteProblem(context, HttpStatusCode.Unauthorized, "No autorizado", ex.Message, correlationId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error no controlado. CorrelationId: {CorrelationId}", correlationId);
            await WriteProblem(context, HttpStatusCode.InternalServerError, "Error interno",
                "Ocurrió un error inesperado. Contacte a soporte con el CorrelationId indicado.", correlationId);
        }
    }

    private static async Task WriteProblem(HttpContext context, HttpStatusCode status, string title, string detail, string correlationId)
    {
        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = (int)status;

        var problem = new ProblemDetails
        {
            Title = title,
            Status = (int)status,
            Detail = detail,
            Extensions = { ["correlationId"] = correlationId },
        };

        await context.Response.WriteAsJsonAsync(problem);
    }
}
