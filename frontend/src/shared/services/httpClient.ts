import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5100/api";

export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

const TOKEN_STORAGE_KEY = "onboarding_auth_token";

// NOTA DE SEGURIDAD: localStorage es vulnerable a XSS. Para un sistema
// bancario en producción, la opción preferida es una cookie httpOnly
// emitida por el backend (requiere que backend y frontend compartan
// dominio/CORS con credentials, y CSRF token). Se deja este mecanismo
// simple para esta fase, marcado explícitamente como pendiente de
// endurecer antes de producción.
export function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}
export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}
export function clearStoredToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Forma normalizada de error para toda la app -- los componentes nunca
 * parsean AxiosError ni ProblemDetails directamente. */
export interface ApiError {
  status: number;
  title: string;
  detail: string;
  correlationId?: string;
}

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ title?: string; detail?: string; correlationId?: string }>) => {
    const apiError: ApiError = error.response
      ? {
          status: error.response.status,
          title: error.response.data?.title ?? "Error",
          detail:
            error.response.data?.detail ??
            "Ocurrió un problema al procesar la solicitud. Intenta nuevamente.",
          correlationId: error.response.data?.correlationId,
        }
      : {
          status: 0,
          title: "Sin conexión",
          detail: "No se pudo conectar con el servidor. Verifica tu conexión a Internet.",
        };

    if (apiError.status === 401) {
      clearStoredToken();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(apiError);
  }
);
