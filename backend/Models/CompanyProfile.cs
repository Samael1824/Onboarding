namespace Onboarding.Api.Models;

/// <summary>
/// Datos generales de la empresa solicitante. Es una tabla propia (1:1 con
/// OnboardingApplication) en vez de columnas sueltas sobre la solicitud,
/// porque conceptualmente es un bloque de información independiente
/// (y en el futuro, otras secciones del wizard serán sus propias tablas:
/// Shareholders, BeneficialOwners, etc.).
/// </summary>
public class CompanyProfile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ApplicationId { get; set; }
    public OnboardingApplication? Application { get; set; }

    // --- Datos generales ---
    public string? LegalName { get; set; }
    public string? TradeName { get; set; }
    public string? CompanyType { get; set; }
    public string? IdentificationType { get; set; }
    public string? IdentificationNumber { get; set; }
    public DateTime? IncorporationDate { get; set; }
    public string? IncorporationCountry { get; set; }
    public string? IncorporationRegistryNumber { get; set; }
    public string? ConstitutionDeedNumber { get; set; }
    public string? NotaryName { get; set; }
    public decimal? ShareCapital { get; set; }
    public string? ShareCapitalCurrency { get; set; }
    public int? NumberOfEmployees { get; set; }
    public string? CompanyWebsite { get; set; }
    public bool IsRegulatedEntity { get; set; }
    public string? RegulatorName { get; set; }
    public bool HasUsPresence { get; set; }
    public string? UsTaxId { get; set; }
    public bool IsPubliclyTraded { get; set; }
    public string? StockExchange { get; set; }

    // --- Domicilio fiscal ---
    public string? AddressCountry { get; set; }
    public string? AddressProvince { get; set; }
    public string? AddressMunicipality { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressNeighborhood { get; set; }
    public string? AddressStreet { get; set; }
    public string? AddressHouseNumber { get; set; }
    public string? AddressPostalCode { get; set; }
    public string? AddressReference { get; set; }

    // --- Contacto ---
    public string? PhoneCountryCode { get; set; }
    public string? PhoneNumber { get; set; }
    public string? SecondaryPhone { get; set; }
    public string? Email { get; set; }
    public string? FaxNumber { get; set; }

    // --- Actividad económica ---
    public string? PrimaryEconomicActivity { get; set; }
    public string? SecondaryEconomicActivity { get; set; }
    public string? IndustrySector { get; set; }
    public string? MainProductsServices { get; set; }
    public int? YearsInOperation { get; set; }
    public decimal? EstimatedAnnualRevenue { get; set; }
    public decimal? EstimatedMonthlyIncome { get; set; }
    public string? SourceOfFunds { get; set; }
    public string? MainSuppliersCountries { get; set; }
    public string? MainCustomersCountries { get; set; }
    public bool ExportsGoods { get; set; }
    public bool ImportsGoods { get; set; }

    // --- Información financiera / producto solicitado ---
    public bool HasExistingBankAccounts { get; set; }
    public string? OtherBanksNames { get; set; }
    public string? RequestedProductType { get; set; }
    public string? RequestedCurrency { get; set; }
    public decimal? EstimatedMonthlyTransactionVolume { get; set; }
    public int? EstimatedMonthlyTransactionCount { get; set; }

    // --- Representante legal ---
    public string? LegalRepresentativeName { get; set; }
    public string? LegalRepresentativeIdType { get; set; }
    public string? LegalRepresentativeIdNumber { get; set; }
    public string? LegalRepresentativePosition { get; set; }
    public string? LegalRepresentativeEmail { get; set; }
    public string? LegalRepresentativePhone { get; set; }
}
