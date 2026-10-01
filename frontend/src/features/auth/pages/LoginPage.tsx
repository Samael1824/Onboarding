import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import type { ApiError } from "@/shared/services/httpClient";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/select-country";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await loginRequest(email, password);
      login(result);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError((err as ApiError).detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="centered-layout">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-mark">B</span>
          Onboarding Jurídico
        </div>
        <h1>Inicia sesión</h1>
        <p>Accede para continuar tu solicitud de apertura de cuenta.</p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert-error" role="alert">{error}</div>}

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}
