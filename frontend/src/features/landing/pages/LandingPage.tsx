import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="centered-layout">
      <div className="auth-card" style={{ maxWidth: 520, textAlign: "center" }}>
        <div className="brand" style={{ justifyContent: "center" }}>
          <span className="brand-mark">B</span>
          Onboarding Jurídico
        </div>
        <h1>Apertura de Cuenta Jurídica</h1>
        <p>
          Inicia digitalmente la solicitud de apertura de cuenta jurídica de tu
          empresa. Guarda tu avance en cualquier momento y continúa cuando
          quieras.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <Link to="/register" className="btn btn-primary">Crear cuenta</Link>
          <Link to="/login" className="btn btn-secondary">Iniciar sesión</Link>
        </div>
      </div>
    </main>
  );
}
