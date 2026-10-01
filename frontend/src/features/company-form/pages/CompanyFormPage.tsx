import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  companyFormSchema,
  companyFormDefaults,
  type CompanyFormValues,
} from "../schema/companyFormSchema";
import { getCompanyProfile, saveCompanyProfile } from "../services/companyFormService";
import {
  TextField,
  NumberField,
  TextAreaField,
  SelectField,
  CheckboxField,
} from "../components/FormFields";
import {
  companyTypeOptions,
  identificationTypeOptions,
  currencyOptions,
  requestedProductOptions,
  sourceOfFundsOptions,
  industrySectorOptions,
  legalRepresentativeIdOptions,
  extraIncorporationCountryOptions,
} from "../constants/formOptions";
import { generateDocumentChecklist } from "../documentChecklist";
import { DocumentChecklistSection } from "../components/DocumentChecklistSection";
import { supportedCountries } from "@/shared/validation/countryRules";
import type { ApiError } from "@/shared/services/httpClient";

const SECTIONS = [
  { id: "general", index: 1, title: "Datos generales" },
  { id: "address", index: 2, title: "Domicilio fiscal" },
  { id: "contact", index: 3, title: "Contacto" },
  { id: "activity", index: 4, title: "Actividad económica" },
  { id: "financial", index: 5, title: "Información financiera" },
  { id: "representative", index: 6, title: "Representante legal" },
  { id: "documents", index: 7, title: "Documentos requeridos" },
] as const;

const countryOptions = mergeCountryOptions(
  supportedCountries.map((c) => ({ value: c.code, label: c.name })),
  extraIncorporationCountryOptions
);

export function CompanyFormPage() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: companyFormDefaults,
  });

  const checklistItems = generateDocumentChecklist(watch());

  // Prefill: carga de datos existentes al entrar a la página. Side effect
  // legítimo (sincronización con el servidor al montar).
  useEffect(() => {
    if (!applicationId) return;
    let cancelled = false;

    getCompanyProfile(applicationId)
      .then((data) => {
        if (cancelled) return;
        reset({ ...companyFormDefaults, ...sanitizeForForm(data) });
      })
      .catch((err) => {
        if (!cancelled) setLoadError((err as ApiError).detail);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [applicationId, reset]);

  const onSubmit = async (values: CompanyFormValues) => {
    if (!applicationId) return;
    setSaveError(null);
    setIsSaving(true);
    try {
      await saveCompanyProfile(applicationId, values);
      setLastSavedAt(new Date());
    } catch (err) {
      setSaveError((err as ApiError).detail);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p>Cargando formulario...</p>;
  }

  if (loadError) {
    return <div className="alert alert-error" role="alert">{loadError}</div>;
  }

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <nav
        style={{
          position: "sticky",
          top: "1.5rem",
          width: 200,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start" }}
          >
            {s.index}. {s.title}
          </a>
        ))}
        <button className="btn btn-ghost" style={{ justifyContent: "flex-start", marginTop: "1rem" }} onClick={() => navigate("/dashboard")}>
          ← Volver al dashboard
        </button>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ flex: 1, minWidth: 0 }}>
        <h1>Datos de la empresa</h1>
        <p>Completa la información de tu empresa. Puedes guardar en cualquier momento y continuar después.</p>

        <section id="general" className="card">
          <div className="card-header"><h2><span className="section-index">1.</span>Datos generales</h2></div>
          <div className="form-grid">
            <TextField label="Razón social" registration={register("legalName")} error={errors.legalName} />
            <TextField label="Nombre comercial" registration={register("tradeName")} error={errors.tradeName} />
            <SelectField label="Tipo de sociedad" registration={register("companyType")} error={errors.companyType} options={companyTypeOptions} />
            <SelectField label="Tipo de identificación" registration={register("identificationType")} error={errors.identificationType} options={identificationTypeOptions} />
            <TextField label="Número de identificación" registration={register("identificationNumber")} error={errors.identificationNumber} />
            <TextField label="Fecha de constitución" type="date" registration={register("incorporationDate")} error={errors.incorporationDate} />
            <SelectField label="País de constitución" registration={register("incorporationCountry")} error={errors.incorporationCountry} options={countryOptions} />
            <TextField label="No. de registro mercantil" registration={register("incorporationRegistryNumber")} error={errors.incorporationRegistryNumber} />
            <TextField label="No. de escritura de constitución" registration={register("constitutionDeedNumber")} error={errors.constitutionDeedNumber} />
            <TextField label="Notario" registration={register("notaryName")} error={errors.notaryName} />
            <NumberField label="Capital social" registration={register("shareCapital")} error={errors.shareCapital} />
            <SelectField label="Moneda del capital" registration={register("shareCapitalCurrency")} error={errors.shareCapitalCurrency} options={currencyOptions} />
            <NumberField label="Número de empleados" registration={register("numberOfEmployees")} error={errors.numberOfEmployees} />
            <TextField label="Sitio web" registration={register("companyWebsite")} error={errors.companyWebsite} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <CheckboxField label="¿Es una entidad regulada?" registration={register("isRegulatedEntity")} />
            <CheckboxField label="¿Tiene presencia en EE. UU.?" registration={register("hasUsPresence")} />
            <CheckboxField label="¿Cotiza en bolsa?" registration={register("isPubliclyTraded")} />
          </div>
          <div className="form-grid" style={{ marginTop: "0.5rem" }}>
            <TextField label="Nombre del regulador" registration={register("regulatorName")} error={errors.regulatorName} hint="Solo si es entidad regulada" />
            <TextField label="US Tax ID (EIN)" registration={register("usTaxId")} error={errors.usTaxId} hint="Solo si tiene presencia en EE. UU." />
            <TextField label="Bolsa de valores" registration={register("stockExchange")} error={errors.stockExchange} hint="Solo si cotiza en bolsa" />
          </div>
        </section>

        <section id="address" className="card">
          <div className="card-header"><h2><span className="section-index">2.</span>Domicilio fiscal</h2></div>
          <div className="form-grid">
            <SelectField label="País" registration={register("addressCountry")} error={errors.addressCountry} options={countryOptions} />
            <TextField label="Departamento / Provincia" registration={register("addressProvince")} error={errors.addressProvince} />
            <TextField label="Municipio" registration={register("addressMunicipality")} error={errors.addressMunicipality} />
            <TextField label="Ciudad" registration={register("addressCity")} error={errors.addressCity} />
            <TextField label="Barrio / Colonia" registration={register("addressNeighborhood")} error={errors.addressNeighborhood} />
            <TextField label="Calle" registration={register("addressStreet")} error={errors.addressStreet} />
            <TextField label="Número de casa / edificio" registration={register("addressHouseNumber")} error={errors.addressHouseNumber} />
            <TextField label="Código postal" registration={register("addressPostalCode")} error={errors.addressPostalCode} />
            <TextAreaField label="Punto de referencia" registration={register("addressReference")} error={errors.addressReference} full />
          </div>
        </section>

        <section id="contact" className="card">
          <div className="card-header"><h2><span className="section-index">3.</span>Contacto</h2></div>
          <div className="form-grid">
            <TextField label="Código de país (teléfono)" registration={register("phoneCountryCode")} error={errors.phoneCountryCode} hint="Ej. +505" />
            <TextField label="Teléfono principal" registration={register("phoneNumber")} error={errors.phoneNumber} />
            <TextField label="Teléfono secundario" registration={register("secondaryPhone")} error={errors.secondaryPhone} />
            <TextField label="Correo electrónico" type="email" registration={register("email")} error={errors.email} />
            <TextField label="Fax" registration={register("faxNumber")} error={errors.faxNumber} />
          </div>
        </section>

        <section id="activity" className="card">
          <div className="card-header"><h2><span className="section-index">4.</span>Actividad económica</h2></div>
          <div className="form-grid">
            <TextField label="Actividad económica principal" registration={register("primaryEconomicActivity")} error={errors.primaryEconomicActivity} />
            <TextField label="Actividad económica secundaria" registration={register("secondaryEconomicActivity")} error={errors.secondaryEconomicActivity} />
            <SelectField label="Sector industrial" registration={register("industrySector")} error={errors.industrySector} options={industrySectorOptions} />
            <NumberField label="Años en operación" registration={register("yearsInOperation")} error={errors.yearsInOperation} />
            <NumberField label="Ingresos anuales estimados" registration={register("estimatedAnnualRevenue")} error={errors.estimatedAnnualRevenue} />
            <NumberField label="Ingreso mensual estimado" registration={register("estimatedMonthlyIncome")} error={errors.estimatedMonthlyIncome} />
            <SelectField label="Origen de fondos" registration={register("sourceOfFunds")} error={errors.sourceOfFunds} options={sourceOfFundsOptions} />
            <TextField label="Principales países proveedores" registration={register("mainSuppliersCountries")} error={errors.mainSuppliersCountries} />
            <TextField label="Principales países clientes" registration={register("mainCustomersCountries")} error={errors.mainCustomersCountries} />
            <TextAreaField label="Principales productos / servicios" registration={register("mainProductsServices")} error={errors.mainProductsServices} full />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <CheckboxField label="¿Exporta bienes?" registration={register("exportsGoods")} />
            <CheckboxField label="¿Importa bienes?" registration={register("importsGoods")} />
          </div>
        </section>

        <section id="financial" className="card">
          <div className="card-header"><h2><span className="section-index">5.</span>Información financiera</h2></div>
          <div style={{ marginBottom: "0.5rem" }}>
            <CheckboxField label="¿Tiene cuentas bancarias existentes?" registration={register("hasExistingBankAccounts")} />
          </div>
          <div className="form-grid">
            <TextField label="Otros bancos" registration={register("otherBanksNames")} error={errors.otherBanksNames} hint="Solo si tiene cuentas existentes" />
            <SelectField label="Producto solicitado" registration={register("requestedProductType")} error={errors.requestedProductType} options={requestedProductOptions} />
            <SelectField label="Moneda solicitada" registration={register("requestedCurrency")} error={errors.requestedCurrency} options={currencyOptions} />
            <NumberField label="Volumen mensual estimado de transacciones" registration={register("estimatedMonthlyTransactionVolume")} error={errors.estimatedMonthlyTransactionVolume} />
            <NumberField label="Número mensual estimado de transacciones" registration={register("estimatedMonthlyTransactionCount")} error={errors.estimatedMonthlyTransactionCount} />
          </div>
        </section>

        <section id="representative" className="card">
          <div className="card-header"><h2><span className="section-index">6.</span>Representante legal</h2></div>
          <div className="form-grid">
            <TextField label="Nombre completo" registration={register("legalRepresentativeName")} error={errors.legalRepresentativeName} />
            <SelectField label="Tipo de identificación" registration={register("legalRepresentativeIdType")} error={errors.legalRepresentativeIdType} options={legalRepresentativeIdOptions} />
            <TextField label="Número de identificación" registration={register("legalRepresentativeIdNumber")} error={errors.legalRepresentativeIdNumber} />
            <TextField label="Cargo" registration={register("legalRepresentativePosition")} error={errors.legalRepresentativePosition} />
            <TextField label="Correo" type="email" registration={register("legalRepresentativeEmail")} error={errors.legalRepresentativeEmail} />
            <TextField label="Teléfono" registration={register("legalRepresentativePhone")} error={errors.legalRepresentativePhone} />
          </div>
        </section>

        <DocumentChecklistSection items={checklistItems} />

        <div className="form-actions-bar">
          <span className="save-status">
            {saveError
              ? <span style={{ color: "var(--color-danger)" }}>{saveError}</span>
              : lastSavedAt
                ? `Guardado a las ${lastSavedAt.toLocaleTimeString()}`
                : "Sin guardar"}
          </span>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar avance"}
          </button>
        </div>
      </form>
    </div>
  );
}

/** El backend puede devolver null en campos vacíos; los inputs controlados
 * de React necesitan "" en vez de null para no volverse "uncontrolled". */
function sanitizeForForm(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value === null ? "" : value])
  );
}

function mergeCountryOptions(
  primary: { value: string; label: string }[],
  extra: { value: string; label: string }[]
): { value: string; label: string }[] {
  const seen = new Set(primary.map((c) => c.value));
  return [...primary, ...extra.filter((c) => !seen.has(c.value))];
}
