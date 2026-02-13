import { AxiosError } from 'axios';
import axiosConfig from '../axios.config';
import { setTokenCookie, setRefreshTokenCookie } from '@/lib/auth';

export interface RefreshResult {
  success: boolean;
  token?: string;
  refresh_token?: string;
  message?: string;
}

interface AuthTokenPayload {
  token?: string;
  refresh_token?: string;
}

const extractAuthTokens = (payload: unknown): AuthTokenPayload => {
  if (!payload || typeof payload !== 'object') return {};
  const root = payload as Record<string, unknown>;

  const token = typeof root.token === 'string' ? root.token : undefined;
  const refreshToken = typeof root.refresh_token === 'string' ? root.refresh_token : undefined;
  if (token || refreshToken) {
    return { token, refresh_token: refreshToken };
  }

  const nested = root.data;
  if (!nested || typeof nested !== 'object') return {};
  const nestedObj = nested as Record<string, unknown>;

  return {
    token: typeof nestedObj.token === 'string' ? nestedObj.token : undefined,
    refresh_token: typeof nestedObj.refresh_token === 'string' ? nestedObj.refresh_token : undefined,
  };
};

export const refreshTokenService = {
  async refreshToken(refreshToken: string): Promise<RefreshResult> {
    try {
      const response = await axiosConfig.post('/api/v1/auth/refresh-token', {
        refresh_token: refreshToken,
      });

      // Update cookies with new tokens
      const tokens = extractAuthTokens(response.data);
      if (tokens.token) {
        setTokenCookie(tokens.token);
      }
      if (tokens.refresh_token) {
        setRefreshTokenCookie(tokens.refresh_token);
      }

      return {
        success: true,
        token: tokens.token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error: unknown) {
      console.error('Refresh token service error:', error);

      const isAxiosError = (err: unknown): err is AxiosError => {
        return (err as AxiosError).response !== undefined;
      };

      if (isAxiosError(error) && error.response) {
        const { status } = error.response;
        if (status === 401) {
          return {
            success: false,
            message: 'Invalid or expired refresh token',
          };
        } else if (status === 400) {
          return {
            success: false,
            message: 'Bad request',
          };
        }
      }

      return {
        success: false,
        message: 'Failed to refresh token',
      };
    }
  },
};
