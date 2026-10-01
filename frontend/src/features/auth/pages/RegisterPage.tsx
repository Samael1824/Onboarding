import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import type { ApiError } from "@/shared/services/httpClient";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerRequest(email, password, fullName);
      login(result);
      navigate("/select-country", { replace: true });
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
        <h1>Crea tu cuenta</h1>
        <p>Regístrate para iniciar la apertura de cuenta jurídica de tu empresa.</p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert-error" role="alert">{error}</div>}

          <div className="field">
            <label htmlFor="fullName">Nombre completo</label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <p className="hint">Mínimo 8 caracteres.</p>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
