using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Onboarding.Api.Dtos;
using Onboarding.Api.Services;

namespace Onboarding.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/onboarding")]
public class OnboardingController : ControllerBase
{
    private readonly IOnboardingService _service;

    public OnboardingController(IOnboardingService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<ApplicationResponse>> Create(CreateApplicationRequest request, CancellationToken ct)
    {
        var result = await _service.CreateApplicationAsync(User.GetUserId(), request, ct);
        return CreatedAtAction(nameof(GetById), new { id = result.ApplicationId }, result);
    }

    [HttpGet("mine")]
    public async Task<ActionResult<List<ApplicationResponse>>> GetMine(CancellationToken ct)
    {
        var result = await _service.GetMineAsync(User.GetUserId(), ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ApplicationResponse>> GetById(Guid id, CancellationToken ct)
    {
        var result = await _service.GetSummaryAsync(User.GetUserId(), id, ct);
        return Ok(result);
    }

    [HttpGet("{id:guid}/company")]
    public async Task<ActionResult<CompanyProfileDto>> GetCompany(Guid id, CancellationToken ct)
    {
        var result = await _service.GetCompanyProfileAsync(User.GetUserId(), id, ct);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/company")]
    public async Task<ActionResult<ApplicationResponse>> SaveCompany(Guid id, CompanyProfileDto dto, CancellationToken ct)
    {
        var result = await _service.SaveCompanyProfileAsync(User.GetUserId(), id, dto, ct);
        return Ok(result);
    }
}
