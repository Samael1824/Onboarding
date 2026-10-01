import type { CountryConfig } from "./types";

/** NOTA: formatos ilustrativos, pendientes de confirmación legal/compliance. */
export const svConfig: CountryConfig = {
  code: "SV",
  name: "El Salvador",
  defaultIdentificationType: "NIT",
  identifications: {
    NIT: {
      type: "NIT",
      label: "NIT",
      regex: /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/,
      minLength: 17,
      maxLength: 17,
      mask: "0000-000000-000-0",
      placeholder: "0614-010101-001-2",
      helpText: "Formato provisional, pendiente de confirmación legal.",
    },
  },
};
