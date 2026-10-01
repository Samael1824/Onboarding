namespace Onboarding.Api.Dtos;

/// <summary>
/// Espejo 1:1 de Models.CompanyProfile, sin Id/ApplicationId. Se usa tanto
/// para GET (prefill) como para PATCH (guardado parcial): todos los campos
/// son opcionales porque el usuario puede guardar el formulario incompleto.
/// </summary>
public class CompanyProfileDto
{
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

    public string? AddressCountry { get; set; }
    public string? AddressProvince { get; set; }
    public string? AddressMunicipality { get; set; }
    public string? AddressCity { get; set; }
    public string? AddressNeighborhood { get; set; }
    public string? AddressStreet { get; set; }
    public string? AddressHouseNumber { get; set; }
    public string? AddressPostalCode { get; set; }
    public string? AddressReference { get; set; }

    public string? PhoneCountryCode { get; set; }
    public string? PhoneNumber { get; set; }
    public string? SecondaryPhone { get; set; }
    public string? Email { get; set; }
    public string? FaxNumber { get; set; }

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

    public bool HasExistingBankAccounts { get; set; }
    public string? OtherBanksNames { get; set; }
    public string? RequestedProductType { get; set; }
    public string? RequestedCurrency { get; set; }
    public decimal? EstimatedMonthlyTransactionVolume { get; set; }
    public int? EstimatedMonthlyTransactionCount { get; set; }

    public string? LegalRepresentativeName { get; set; }
    public string? LegalRepresentativeIdType { get; set; }
    public string? LegalRepresentativeIdNumber { get; set; }
    public string? LegalRepresentativePosition { get; set; }
    public string? LegalRepresentativeEmail { get; set; }
    public string? LegalRepresentativePhone { get; set; }
}
