import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supportedCountries, type CountryCode } from "@/shared/validation/countryRules";
import { createApplication } from "@/features/dashboard/services/applicationsService";
import type { ApiError } from "@/shared/services/httpClient";

/**
 * Elegir país es OPCIONAL: el usuario puede omitir este paso y va directo
 * a su dashboard de solicitudes existentes. Solo si elige un país se crea
 * una nueva solicitud.
 */
export function CountrySelectPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<CountryCode | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!selected) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const application = await createApplication(selected);
      navigate(`/onboarding/${application.applicationId}/company`);
    } catch (err) {
      setError((err as ApiError).detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="centered-layout">
      <div className="auth-card" style={{ maxWidth: 560 }}>
        <h1>¿En qué país abrirás la cuenta?</h1>
        <p>
          Selecciona el país donde tu empresa realizará la apertura de cuenta
          jurídica. Si aún no lo sabes, puedes omitir este paso y ver tus
          solicitudes existentes.
        </p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <div className="country-grid">
          {supportedCountries.map((c) => (
            <button
              key={c.code}
              type="button"
              className={`country-option${selected === c.code ? " selected" : ""}`}
              onClick={() => setSelected(c.code)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button
            className="btn btn-primary"
            disabled={!selected || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? "Creando solicitud..." : "Continuar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Omitir — ver mis solicitudes
          </button>
        </div>
      </div>
    </main>
  );
}
