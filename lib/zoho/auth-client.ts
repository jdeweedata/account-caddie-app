import { AuthTokens } from './auth-types';

const REFRESH_TOKEN_COOKIE = 'zoho_refresh_token';
const ACCESS_TOKEN_COOKIE = 'zoho_access_token';

export function getClientAuthTokens(): AuthTokens {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }
  
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_COOKIE),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_COOKIE),
  };
}

export async function setAuthTokens(tokens: AuthTokens) {
  if (typeof window !== 'undefined') {
    if (tokens.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_COOKIE, tokens.accessToken);
    }
    if (tokens.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_COOKIE, tokens.refreshToken);
    }
  }
} 