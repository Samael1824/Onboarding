import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications, type ApplicationSummary } from "../services/applicationsService";
import { StatusBadge } from "../components/StatusBadge";
import { getCountryConfig, type CountryCode } from "@/shared/validation/countryRules";
import type { ApiError } from "@/shared/services/httpClient";

export function DashboardPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial desde el servidor: sí amerita useEffect (sincronización
  // con un sistema externo al montar el componente).
  useEffect(() => {
    let cancelled = false;

    getMyApplications()
      .then((data) => {
        if (!cancelled) setApplications(data);
      })
      .catch((err) => {
        if (!cancelled) setError((err as ApiError).detail);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1>Mis solicitudes</h1>
          <p>Continúa una solicitud existente o inicia una nueva.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/select-country")}>
          + Nueva solicitud
        </button>
      </div>

      {error && <div className="alert alert-error" role="alert">{error}</div>}

      {isLoading ? (
        <p>Cargando solicitudes...</p>
      ) : applications.length === 0 ? (
        <div className="card empty-state">
          <h3>Aún no tienes solicitudes</h3>
          <p>Inicia tu primera solicitud de apertura de cuenta jurídica.</p>
          <button className="btn btn-primary" onClick={() => navigate("/select-country")}>
            Iniciar solicitud
          </button>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => {
            const countryName = safeCountryName(app.countryCode);
            return (
              <div key={app.applicationId} className="application-card">
                <h3>{app.applicationNumber}</h3>
                <div className="meta">
                  {countryName} · Actualizada el{" "}
                  {new Date(app.updatedAt).toLocaleDateString()}
                </div>
                <StatusBadge status={app.status} />
                <div style={{ margin: "0.75rem 0" }}>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${app.progressPercentage}%` }} />
                  </div>
                  <div className="meta" style={{ marginTop: 4 }}>{app.progressPercentage}% completado</div>
                </div>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => navigate(`/onboarding/${app.applicationId}/company`)}
                >
                  Continuar
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function safeCountryName(code: string): string {
  try {
    return getCountryConfig(code as CountryCode).name;
  } catch {
    return code;
  }
}
