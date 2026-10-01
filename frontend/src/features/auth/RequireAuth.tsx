import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

/** Envuelve rutas que requieren sesión iniciada; si no hay sesión, manda a /login
 * recordando a dónde quería ir el usuario para regresarlo tras autenticarse. */
export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
