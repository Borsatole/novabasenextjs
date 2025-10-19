/**
 * Obtém um cookie pelo nome
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Define um cookie
 */
export function setCookie(name: string, value: string, days = 7): void {
  if (typeof window === "undefined") {
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Remove um cookie
 */
export function removeCookie(name: string): void {
  if (typeof window === "undefined") {
    return;
  }

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}