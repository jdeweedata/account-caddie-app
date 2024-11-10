import { cookies } from 'next/headers';
import { AuthTokens } from './auth-types';

const REFRESH_TOKEN_COOKIE = 'zoho_refresh_token';
const ACCESS_TOKEN_COOKIE = 'zoho_access_token';

export function getServerAuthTokens(): AuthTokens {
  const cookieStore = cookies();
  
  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
  };
} 