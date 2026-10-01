import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  getStoredToken,
  setStoredToken,
  clearStoredToken,
} from "@/shared/services/httpClient";
import type { AuthResult, AuthUser } from "../services/authService";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (result: AuthResult) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_STORAGE_KEY = "onboarding_auth_user";

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Se inicializa leyendo localStorage una sola vez (lazy initializer),
  // no con useEffect: es lectura síncrona de almacenamiento local, no un
  // side effect que dependa de algo externo cambiante.
  const [user, setUser] = useState<AuthUser | null>(() =>
    getStoredToken() ? readStoredUser() : null
  );

  const login = (result: AuthResult) => {
    setStoredToken(result.token);
    const authUser: AuthUser = {
      userId: result.userId,
      email: result.email,
      fullName: result.fullName,
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    clearStoredToken();
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
