export const TOKEN_COOKIE_NAME = 'auth_token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

const parseCookieValue = (cookieHeader: string, name: string): string | null => {
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${name}=`)) {
      return trimmed.slice(name.length + 1) || null;
    }
  }
  return null;
};

// Client-side functions
export const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  return parseCookieValue(document.cookie, TOKEN_COOKIE_NAME);
};

export const setTokenCookie = (token: string, maxAge: number = 3600) => {
  if (typeof document === 'undefined') return;
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
};

export const getRefreshTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  return parseCookieValue(document.cookie, REFRESH_TOKEN_COOKIE_NAME);
};

export const setRefreshTokenCookie = (refreshToken: string, maxAge: number = 86400 * 7) => {
  if (typeof document === 'undefined') return;
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
};

export const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; max-age=0`;
  document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=; path=/; max-age=0`;
};

// Server-side functions (for middleware)
export const getTokenFromServerCookie = (request: Request): string | null => {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  return parseCookieValue(cookieHeader, TOKEN_COOKIE_NAME);
};

export const getRefreshTokenFromServerCookie = (request: Request): string | null => {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  return parseCookieValue(cookieHeader, REFRESH_TOKEN_COOKIE_NAME);
};
