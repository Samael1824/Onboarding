import { z } from "zod";

/**
 * Schema del formulario de datos generales de la empresa (~58 campos).
 * La mayoría son opcionales porque el usuario puede guardar un borrador
 * incompleto; solo se marcan required los campos mínimos para que la
 * solicitud tenga sentido como borrador identificable.
 */
export const companyFormSchema = z.object({
  // Datos generales
  legalName: z.string().min(3, "Requerido, mínimo 3 caracteres"),
  tradeName: z.string().optional(),
  companyType: z.string().min(1, "Selecciona un tipo de empresa"),
  identificationType: z.string().min(1, "Requerido"),
  identificationNumber: z.string().min(1, "Requerido"),
  incorporationDate: z.string().optional(),
  incorporationCountry: z.string().optional(),
  incorporationRegistryNumber: z.string().optional(),
  constitutionDeedNumber: z.string().optional(),
  notaryName: z.string().optional(),
  shareCapital: z.coerce.number().nonnegative().optional().or(z.literal("")),
  shareCapitalCurrency: z.string().optional(),
  numberOfEmployees: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  companyWebsite: z.string().optional(),
  isRegulatedEntity: z.boolean(),
  regulatorName: z.string().optional(),
  hasUsPresence: z.boolean(),
  usTaxId: z.string().optional(),
  isPubliclyTraded: z.boolean(),
  stockExchange: z.string().optional(),

  // Domicilio fiscal
  addressCountry: z.string().min(1, "Requerido"),
  addressProvince: z.string().optional(),
  addressMunicipality: z.string().optional(),
  addressCity: z.string().optional(),
  addressNeighborhood: z.string().optional(),
  addressStreet: z.string().optional(),
  addressHouseNumber: z.string().optional(),
  addressPostalCode: z.string().optional(),
  addressReference: z.string().optional(),

  // Contacto
  phoneCountryCode: z.string().optional(),
  phoneNumber: z.string().min(1, "Requerido"),
  secondaryPhone: z.string().optional(),
  email: z.string().email("Correo inválido"),
  faxNumber: z.string().optional(),

  // Actividad económica
  primaryEconomicActivity: z.string().min(1, "Requerido"),
  secondaryEconomicActivity: z.string().optional(),
  industrySector: z.string().optional(),
  mainProductsServices: z.string().optional(),
  yearsInOperation: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  estimatedAnnualRevenue: z.coerce.number().nonnegative().optional().or(z.literal("")),
  estimatedMonthlyIncome: z.coerce.number().nonnegative().optional().or(z.literal("")),
  sourceOfFunds: z.string().optional(),
  mainSuppliersCountries: z.string().optional(),
  mainCustomersCountries: z.string().optional(),
  exportsGoods: z.boolean(),
  importsGoods: z.boolean(),

  // Información financiera / producto solicitado
  hasExistingBankAccounts: z.boolean(),
  otherBanksNames: z.string().optional(),
  requestedProductType: z.string().optional(),
  requestedCurrency: z.string().optional(),
  estimatedMonthlyTransactionVolume: z.coerce.number().nonnegative().optional().or(z.literal("")),
  estimatedMonthlyTransactionCount: z.coerce.number().int().nonnegative().optional().or(z.literal("")),

  // Representante legal
  legalRepresentativeName: z.string().min(1, "Requerido"),
  legalRepresentativeIdType: z.string().optional(),
  legalRepresentativeIdNumber: z.string().min(1, "Requerido"),
  legalRepresentativePosition: z.string().optional(),
  legalRepresentativeEmail: z.string().email("Correo inválido").optional().or(z.literal("")),
  legalRepresentativePhone: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const companyFormDefaults: CompanyFormValues = {
  legalName: "",
  tradeName: "",
  companyType: "",
  identificationType: "",
  identificationNumber: "",
  incorporationDate: "",
  incorporationCountry: "",
  incorporationRegistryNumber: "",
  constitutionDeedNumber: "",
  notaryName: "",
  shareCapital: "",
  shareCapitalCurrency: "",
  numberOfEmployees: "",
  companyWebsite: "",
  isRegulatedEntity: false,
  regulatorName: "",
  hasUsPresence: false,
  usTaxId: "",
  isPubliclyTraded: false,
  stockExchange: "",

  addressCountry: "",
  addressProvince: "",
  addressMunicipality: "",
  addressCity: "",
  addressNeighborhood: "",
  addressStreet: "",
  addressHouseNumber: "",
  addressPostalCode: "",
  addressReference: "",

  phoneCountryCode: "",
  phoneNumber: "",
  secondaryPhone: "",
  email: "",
  faxNumber: "",

  primaryEconomicActivity: "",
  secondaryEconomicActivity: "",
  industrySector: "",
  mainProductsServices: "",
  yearsInOperation: "",
  estimatedAnnualRevenue: "",
  estimatedMonthlyIncome: "",
  sourceOfFunds: "",
  mainSuppliersCountries: "",
  mainCustomersCountries: "",
  exportsGoods: false,
  importsGoods: false,

  hasExistingBankAccounts: false,
  otherBanksNames: "",
  requestedProductType: "",
  requestedCurrency: "",
  estimatedMonthlyTransactionVolume: "",
  estimatedMonthlyTransactionCount: "",

  legalRepresentativeName: "",
  legalRepresentativeIdType: "",
  legalRepresentativeIdNumber: "",
  legalRepresentativePosition: "",
  legalRepresentativeEmail: "",
  legalRepresentativePhone: "",
};
