export type CountryCode = "NI" | "SV" | "HN" | "RD" | "PA";

export interface IdentificationConfig {
  /** Código interno, ej. "RUC", "NIT", "RNC" */
  type: string;
  /** Nombre visible al usuario, ej. "RUC", "NIT", "Cédula/RNC" */
  label: string;
  mask?: string;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  helpText?: string;
}

export interface CountryConfig {
  code: CountryCode;
  name: string;
  /** Un país puede aceptar más de un tipo de identificación (ej. RUC o Cédula). */
  identifications: Record<string, IdentificationConfig>;
  /** Tipo de identificación por defecto a preseleccionar. */
  defaultIdentificationType: string;
}
