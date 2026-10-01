import type { CountryConfig } from "./types";

/** NOTA: formatos ilustrativos, pendientes de confirmación legal/compliance. */
export const rdConfig: CountryConfig = {
  code: "RD",
  name: "República Dominicana",
  defaultIdentificationType: "RNC",
  identifications: {
    RNC: {
      type: "RNC",
      label: "RNC",
      regex: /^[0-9]{9}$/,
      minLength: 9,
      maxLength: 9,
      mask: "000000000",
      placeholder: "130123456",
      helpText: "Formato provisional, pendiente de confirmación legal.",
    },
  },
};
