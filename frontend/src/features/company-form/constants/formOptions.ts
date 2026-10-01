/**
 * Catálogos usados en el formulario. Son listas estáticas por ahora
 * (suficiente para esta fase); cuando el backend exponga
 * /api/catalogs/..., estas listas se reemplazan por datos cargados de ahí
 * sin tocar el formulario (mismo shape { value, label }).
 */

export const companyTypeOptions = [
  { value: "CORPORATION", label: "Sociedad Anónima" },
  { value: "LLC", label: "Sociedad de Responsabilidad Limitada" },
  { value: "PARTNERSHIP", label: "Sociedad Colectiva" },
  { value: "SOLE_PROPRIETORSHIP", label: "Empresa Individual" },
  { value: "OTHER", label: "Otro" },
];

/** Países extra para constitución (no necesariamente países de onboarding). */
export const extraIncorporationCountryOptions = [
  { value: "US", label: "Estados Unidos" },
  { value: "MX", label: "México" },
  { value: "GT", label: "Guatemala" },
  { value: "CR", label: "Costa Rica" },
  { value: "CO", label: "Colombia" },
  { value: "ES", label: "España" },
];

export const identificationTypeOptions = [
  { value: "RUC", label: "RUC" },
  { value: "NIT", label: "NIT" },
  { value: "RTN", label: "RTN" },
  { value: "RNC", label: "RNC" },
  { value: "OTHER", label: "Otro" },
];

export const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "NIO", label: "NIO" },
  { value: "DOP", label: "DOP" },
  { value: "PAB", label: "PAB" },
  { value: "EUR", label: "EUR" },
];

export const requestedProductOptions = [
  { value: "CHECKING_ACCOUNT", label: "Cuenta corriente" },
  { value: "SAVINGS_ACCOUNT", label: "Cuenta de ahorro" },
  { value: "LINE_OF_CREDIT", label: "Línea de crédito" },
  { value: "MERCHANT_SERVICES", label: "Servicios de adquirencia" },
];

export const sourceOfFundsOptions = [
  { value: "OPERATING_REVENUE", label: "Ingresos operativos" },
  { value: "SHAREHOLDER_CAPITAL", label: "Capital de accionistas" },
  { value: "LOAN", label: "Financiamiento / préstamo" },
  { value: "INVESTMENT_RETURNS", label: "Retorno de inversiones" },
  { value: "OTHER", label: "Otro" },
];

export const industrySectorOptions = [
  { value: "COMMERCE", label: "Comercio" },
  { value: "MANUFACTURING", label: "Manufactura" },
  { value: "SERVICES", label: "Servicios" },
  { value: "AGRICULTURE", label: "Agropecuario" },
  { value: "CONSTRUCTION", label: "Construcción" },
  { value: "FINANCIAL", label: "Servicios financieros" },
  { value: "TECHNOLOGY", label: "Tecnología" },
  { value: "OTHER", label: "Otro" },
];

export const legalRepresentativeIdOptions = identificationTypeOptions;
