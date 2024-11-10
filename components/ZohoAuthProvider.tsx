'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthTokens } from '@/lib/zoho/auth-types';
import { getClientAuthTokens, setAuthTokens } from '@/lib/zoho/auth-client';

interface AuthContextType {
  isAuthenticated: boolean;
  tokens: AuthTokens;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  tokens: { accessToken: null, refreshToken: null },
  loading: true,
});

export function ZohoAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthContextType>({
    isAuthenticated: false,
    tokens: { accessToken: null, refreshToken: null },
    loading: true,
  });

  useEffect(() => {
    async function initAuth() {
      try {
        // First try to get tokens from localStorage
        const clientTokens = getClientAuthTokens();
        if (clientTokens.refreshToken) {
          setState({
            isAuthenticated: true,
            tokens: clientTokens,
            loading: false,
          });
          return;
        }

        // If no tokens in localStorage, check with the server
        const response = await fetch('/api/zoho/auth/state');
        const data = await response.json();
        
        setState({
          isAuthenticated: data.isAuthenticated,
          tokens: data.tokens,
          loading: false,
        });

        if (data.tokens) {
          await setAuthTokens(data.tokens);
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }

    initAuth();
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export const useZohoAuth = () => useContext(AuthContext);