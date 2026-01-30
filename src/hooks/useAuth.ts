import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { verifyService } from '@/services/iam/auth-verify.service';
import { refreshTokenService } from '@/services/iam/auth-refresh.service';
import { getTokenFromCookie, getRefreshTokenFromCookie, clearAuthCookies } from '@/lib/auth';
import { ROUTE_PATHS } from '@/lib/paths';

interface User {
  id: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    clearAuthCookies();
    setUser(null);
    router.push(ROUTE_PATHS.signIn);
  }, [router]);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getTokenFromCookie();
      if (token) {
        const verifyResult = await verifyService.verifyToken(token);
        if (verifyResult?.is_valid && verifyResult.sub) {
          setUser({ id: verifyResult.sub });
        } else {
          // Try refresh token
          const refreshToken = getRefreshTokenFromCookie();
          if (refreshToken) {
            const refreshResult = await refreshTokenService.refreshToken(refreshToken);
            if (refreshResult.success) {
              const newToken = getTokenFromCookie();
              const newVerifyResult = await verifyService.verifyToken(newToken || undefined);
              if (newVerifyResult?.is_valid && newVerifyResult.sub) {
                setUser({ id: newVerifyResult.sub });
              } else {
                logout();
              }
            } else {
              logout();
            }
          } else {
            logout();
          }
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refreshAuth,
  };
}