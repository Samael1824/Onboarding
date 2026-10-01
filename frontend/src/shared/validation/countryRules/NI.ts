import type { CountryConfig } from "./types";

/**
 * NOTA IMPORTANTE: los formatos exactos (regex, longitud, máscara) son
 * ILUSTRATIVOS para poder construir y probar el flujo end-to-end. Deben
 * ser confirmados por negocio/legal antes de producción -- no se debe
 * asumir que este regex es la definición oficial del RUC nicaragüense.
 */
export const niConfig: CountryConfig = {
  code: "NI",
  name: "Nicaragua",
  defaultIdentificationType: "RUC",
  identifications: {
    RUC: {
      type: "RUC",
      label: "RUC",
      regex: /^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$/,
      minLength: 14,
      maxLength: 14,
      mask: "000-000000-0000A",
      placeholder: "001-010101-0001A",
      helpText: "Formato provisional, pendiente de confirmación legal.",
    },
  },
};
