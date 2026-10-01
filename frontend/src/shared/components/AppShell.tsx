import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

/** Layout compartido por todas las páginas autenticadas: navbar con el
 * usuario actual y botón de salir, y el contenido de la ruta activa. */
export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand">
          <span className="brand-mark">B</span>
          Onboarding Jurídico
        </div>
        <div className="navbar-user">
          <span>{user?.fullName}</span>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <div className="app-content">
        <div className="app-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
