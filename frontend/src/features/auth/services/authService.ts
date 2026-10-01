import { httpClient } from "@/shared/services/httpClient";

export interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
}

export interface AuthResult extends AuthUser {
  token: string;
}

export async function registerRequest(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResult> {
  const { data } = await httpClient.post<{
    token: string;
    userId: string;
    email: string;
    fullName: string;
  }>("/auth/register", { email, password, fullName });
  return data;
}

export async function loginRequest(email: string, password: string): Promise<AuthResult> {
  const { data } = await httpClient.post<{
    token: string;
    userId: string;
    email: string;
    fullName: string;
  }>("/auth/login", { email, password });
  return data;
}
