import type { CountryConfig } from "./types";

/** NOTA: formatos ilustrativos, pendientes de confirmación legal/compliance. */
export const hnConfig: CountryConfig = {
  code: "HN",
  name: "Honduras",
  defaultIdentificationType: "RTN",
  identifications: {
    RTN: {
      type: "RTN",
      label: "RTN",
      regex: /^[0-9]{14}$/,
      minLength: 14,
      maxLength: 14,
      mask: "00000000000000",
      placeholder: "08011990123456",
      helpText: "Formato provisional, pendiente de confirmación legal.",
    },
  },
};
