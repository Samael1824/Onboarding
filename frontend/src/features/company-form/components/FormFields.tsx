import type { FieldError, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import type { CompanyFormValues } from "../schema/companyFormSchema";

/**
 * Wrappers delgados sobre <input>/<select>/<textarea> que estandarizan
 * label + mensaje de error + estilos. Con ~58 campos, esto es lo que
 * mantiene la página del formulario legible en vez de repetir el mismo
 * bloque de <label>/<input>/<p className="error"> decenas de veces.
 */

interface BaseProps {
  label: string;
  error?: FieldError;
  full?: boolean;
  hint?: string;
}

function FieldWrapper({ label, error, full, hint, htmlFor, children }: BaseProps & { htmlFor: string; children: React.ReactNode }) {
  return (
    <div className={`field${full ? " field-full" : ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && !error && <p className="hint">{hint}</p>}
      {error && <p className="error" role="alert">{error.message}</p>}
    </div>
  );
}

export function TextField({
  label, error, full, hint, type = "text", registration,
}: BaseProps & { type?: "text" | "email" | "date"; registration: UseFormRegisterReturn }) {
  return (
    <FieldWrapper label={label} error={error} full={full} hint={hint} htmlFor={registration.name}>
      <input id={registration.name} type={type} aria-invalid={!!error} {...registration} />
    </FieldWrapper>
  );
}

export function NumberField({
  label, error, full, hint, registration,
}: BaseProps & { registration: UseFormRegisterReturn }) {
  return (
    <FieldWrapper label={label} error={error} full={full} hint={hint} htmlFor={registration.name}>
      <input id={registration.name} type="number" step="any" aria-invalid={!!error} {...registration} />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label, error, full, hint, registration,
}: BaseProps & { registration: UseFormRegisterReturn }) {
  return (
    <FieldWrapper label={label} error={error} full={full} hint={hint} htmlFor={registration.name}>
      <textarea id={registration.name} aria-invalid={!!error} {...registration} />
    </FieldWrapper>
  );
}

export function SelectField({
  label, error, full, hint, registration, options,
}: BaseProps & { registration: UseFormRegisterReturn; options: { value: string; label: string }[] }) {
  return (
    <FieldWrapper label={label} error={error} full={full} hint={hint} htmlFor={registration.name}>
      <select id={registration.name} aria-invalid={!!error} {...registration}>
        <option value="">Selecciona...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function CheckboxField({
  label, registration,
}: { label: string; registration: UseFormRegisterReturn }) {
  return (
    <div className="checkbox-field">
      <input id={registration.name} type="checkbox" {...registration} />
      <label htmlFor={registration.name}>{label}</label>
    </div>
  );
}

export type RegisterFn = UseFormRegister<CompanyFormValues>;
