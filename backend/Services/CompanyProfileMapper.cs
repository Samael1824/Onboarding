using Onboarding.Api.Dtos;
using Onboarding.Api.Models;

namespace Onboarding.Api.Services;

/// <summary>
/// Mapeo manual y explícito entre CompanyProfile (entidad) y CompanyProfileDto.
/// Con ~58 campos, un mapper automático (AutoMapper) ahorraría líneas pero
/// esconde qué campo va a dónde; para un formulario bancario preferimos que
/// sea grep-eable y depurable a simple vista.
/// </summary>
public static class CompanyProfileMapper
{
    public static CompanyProfileDto ToDto(CompanyProfile p) => new()
    {
        LegalName = p.LegalName,
        TradeName = p.TradeName,
        CompanyType = p.CompanyType,
        IdentificationType = p.IdentificationType,
        IdentificationNumber = p.IdentificationNumber,
        IncorporationDate = p.IncorporationDate,
        IncorporationCountry = p.IncorporationCountry,
        IncorporationRegistryNumber = p.IncorporationRegistryNumber,
        ConstitutionDeedNumber = p.ConstitutionDeedNumber,
        NotaryName = p.NotaryName,
        ShareCapital = p.ShareCapital,
        ShareCapitalCurrency = p.ShareCapitalCurrency,
        NumberOfEmployees = p.NumberOfEmployees,
        CompanyWebsite = p.CompanyWebsite,
        IsRegulatedEntity = p.IsRegulatedEntity,
        RegulatorName = p.RegulatorName,
        HasUsPresence = p.HasUsPresence,
        UsTaxId = p.UsTaxId,
        IsPubliclyTraded = p.IsPubliclyTraded,
        StockExchange = p.StockExchange,

        AddressCountry = p.AddressCountry,
        AddressProvince = p.AddressProvince,
        AddressMunicipality = p.AddressMunicipality,
        AddressCity = p.AddressCity,
        AddressNeighborhood = p.AddressNeighborhood,
        AddressStreet = p.AddressStreet,
        AddressHouseNumber = p.AddressHouseNumber,
        AddressPostalCode = p.AddressPostalCode,
        AddressReference = p.AddressReference,

        PhoneCountryCode = p.PhoneCountryCode,
        PhoneNumber = p.PhoneNumber,
        SecondaryPhone = p.SecondaryPhone,
        Email = p.Email,
        FaxNumber = p.FaxNumber,

        PrimaryEconomicActivity = p.PrimaryEconomicActivity,
        SecondaryEconomicActivity = p.SecondaryEconomicActivity,
        IndustrySector = p.IndustrySector,
        MainProductsServices = p.MainProductsServices,
        YearsInOperation = p.YearsInOperation,
        EstimatedAnnualRevenue = p.EstimatedAnnualRevenue,
        EstimatedMonthlyIncome = p.EstimatedMonthlyIncome,
        SourceOfFunds = p.SourceOfFunds,
        MainSuppliersCountries = p.MainSuppliersCountries,
        MainCustomersCountries = p.MainCustomersCountries,
        ExportsGoods = p.ExportsGoods,
        ImportsGoods = p.ImportsGoods,

        HasExistingBankAccounts = p.HasExistingBankAccounts,
        OtherBanksNames = p.OtherBanksNames,
        RequestedProductType = p.RequestedProductType,
        RequestedCurrency = p.RequestedCurrency,
        EstimatedMonthlyTransactionVolume = p.EstimatedMonthlyTransactionVolume,
        EstimatedMonthlyTransactionCount = p.EstimatedMonthlyTransactionCount,

        LegalRepresentativeName = p.LegalRepresentativeName,
        LegalRepresentativeIdType = p.LegalRepresentativeIdType,
        LegalRepresentativeIdNumber = p.LegalRepresentativeIdNumber,
        LegalRepresentativePosition = p.LegalRepresentativePosition,
        LegalRepresentativeEmail = p.LegalRepresentativeEmail,
        LegalRepresentativePhone = p.LegalRepresentativePhone,
    };

    public static void ApplyDto(CompanyProfile p, CompanyProfileDto dto)
    {
        p.LegalName = dto.LegalName;
        p.TradeName = dto.TradeName;
        p.CompanyType = dto.CompanyType;
        p.IdentificationType = dto.IdentificationType;
        p.IdentificationNumber = dto.IdentificationNumber;
        p.IncorporationDate = dto.IncorporationDate;
        p.IncorporationCountry = dto.IncorporationCountry;
        p.IncorporationRegistryNumber = dto.IncorporationRegistryNumber;
        p.ConstitutionDeedNumber = dto.ConstitutionDeedNumber;
        p.NotaryName = dto.NotaryName;
        p.ShareCapital = dto.ShareCapital;
        p.ShareCapitalCurrency = dto.ShareCapitalCurrency;
        p.NumberOfEmployees = dto.NumberOfEmployees;
        p.CompanyWebsite = dto.CompanyWebsite;
        p.IsRegulatedEntity = dto.IsRegulatedEntity;
        p.RegulatorName = dto.RegulatorName;
        p.HasUsPresence = dto.HasUsPresence;
        p.UsTaxId = dto.UsTaxId;
        p.IsPubliclyTraded = dto.IsPubliclyTraded;
        p.StockExchange = dto.StockExchange;

        p.AddressCountry = dto.AddressCountry;
        p.AddressProvince = dto.AddressProvince;
        p.AddressMunicipality = dto.AddressMunicipality;
        p.AddressCity = dto.AddressCity;
        p.AddressNeighborhood = dto.AddressNeighborhood;
        p.AddressStreet = dto.AddressStreet;
        p.AddressHouseNumber = dto.AddressHouseNumber;
        p.AddressPostalCode = dto.AddressPostalCode;
        p.AddressReference = dto.AddressReference;

        p.PhoneCountryCode = dto.PhoneCountryCode;
        p.PhoneNumber = dto.PhoneNumber;
        p.SecondaryPhone = dto.SecondaryPhone;
        p.Email = dto.Email;
        p.FaxNumber = dto.FaxNumber;

        p.PrimaryEconomicActivity = dto.PrimaryEconomicActivity;
        p.SecondaryEconomicActivity = dto.SecondaryEconomicActivity;
        p.IndustrySector = dto.IndustrySector;
        p.MainProductsServices = dto.MainProductsServices;
        p.YearsInOperation = dto.YearsInOperation;
        p.EstimatedAnnualRevenue = dto.EstimatedAnnualRevenue;
        p.EstimatedMonthlyIncome = dto.EstimatedMonthlyIncome;
        p.SourceOfFunds = dto.SourceOfFunds;
        p.MainSuppliersCountries = dto.MainSuppliersCountries;
        p.MainCustomersCountries = dto.MainCustomersCountries;
        p.ExportsGoods = dto.ExportsGoods;
        p.ImportsGoods = dto.ImportsGoods;

        p.HasExistingBankAccounts = dto.HasExistingBankAccounts;
        p.OtherBanksNames = dto.OtherBanksNames;
        p.RequestedProductType = dto.RequestedProductType;
        p.RequestedCurrency = dto.RequestedCurrency;
        p.EstimatedMonthlyTransactionVolume = dto.EstimatedMonthlyTransactionVolume;
        p.EstimatedMonthlyTransactionCount = dto.EstimatedMonthlyTransactionCount;

        p.LegalRepresentativeName = dto.LegalRepresentativeName;
        p.LegalRepresentativeIdType = dto.LegalRepresentativeIdType;
        p.LegalRepresentativeIdNumber = dto.LegalRepresentativeIdNumber;
        p.LegalRepresentativePosition = dto.LegalRepresentativePosition;
        p.LegalRepresentativeEmail = dto.LegalRepresentativeEmail;
        p.LegalRepresentativePhone = dto.LegalRepresentativePhone;
    }

    /// <summary>
    /// % de campos con valor sobre el total. Heurística simple para dar
    /// feedback de progreso al usuario -- no determina si la solicitud
    /// está "completa" en sentido regulatorio (eso lo definirá el motor
    /// de validación de completitud en una fase posterior).
    /// </summary>
    public static int CalculateProgress(CompanyProfile p)
    {
        var props = typeof(CompanyProfile).GetProperties()
            .Where(prop => prop.Name is not (nameof(CompanyProfile.Id) or nameof(CompanyProfile.ApplicationId) or nameof(CompanyProfile.Application)));

        var total = 0;
        var filled = 0;

        foreach (var prop in props)
        {
            total++;
            var value = prop.GetValue(p);
            var isFilled = value switch
            {
                null => false,
                string s => !string.IsNullOrWhiteSpace(s),
                bool => true, // un bool siempre "tiene valor" (false es una respuesta válida)
                _ => true,
            };
            if (isFilled) filled++;
        }

        return total == 0 ? 0 : (int)Math.Round(filled * 100.0 / total);
    }
}
