import { getCookie } from "./cookies";

/**
 * Obtém o token de autenticação do cookie
 */
export function getToken(): string | null {
  return getCookie("token");
}