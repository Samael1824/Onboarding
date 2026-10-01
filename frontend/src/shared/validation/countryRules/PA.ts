import type { CountryConfig } from "./types";

/** NOTA: formatos ilustrativos, pendientes de confirmación legal/compliance. */
export const paConfig: CountryConfig = {
  code: "PA",
  name: "Panamá",
  defaultIdentificationType: "RUC",
  identifications: {
    RUC: {
      type: "RUC",
      label: "RUC",
      regex: /^[0-9A-Za-z-]{6,20}$/,
      minLength: 6,
      maxLength: 20,
      placeholder: "155646465-2-2015",
      helpText:
        "El RUC panameño tiene variantes de formato según tipo societario; formato provisional pendiente de confirmación legal.",
    },
  },
};
