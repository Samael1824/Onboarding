import type { CountryCode, CountryConfig, IdentificationConfig } from "./types";
import { niConfig } from "./NI";
import { svConfig } from "./SV";
import { hnConfig } from "./HN";
import { rdConfig } from "./RD";
import { paConfig } from "./PA";

/**
 * Registro central de configuración por país. Agregar un país nuevo es
 * crear su archivo (ej. GT.ts) y añadirlo aquí -- nunca tocar componentes
 * ni agregar un nuevo `if (country === "XX")` en la UI.
 */
export const countryRules: Record<CountryCode, CountryConfig> = {
  NI: niConfig,
  SV: svConfig,
  HN: hnConfig,
  RD: rdConfig,
  PA: paConfig,
};

export const supportedCountries: CountryConfig[] = Object.values(countryRules);

export function getCountryConfig(country: CountryCode): CountryConfig {
  const config = countryRules[country];
  if (!config) {
    throw new Error(`País no soportado: ${country}`);
  }
  return config;
}

export function getIdentificationConfig(
  country: CountryCode,
  identificationType: string
): IdentificationConfig {
  const countryConfig = getCountryConfig(country);
  const idConfig = countryConfig.identifications[identificationType];
  if (!idConfig) {
    throw new Error(
      `Tipo de identificación "${identificationType}" no configurado para ${country}`
    );
  }
  return idConfig;
}

export type { CountryCode, CountryConfig, IdentificationConfig };
