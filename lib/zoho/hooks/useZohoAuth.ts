'use client'

import { useState, useCallback, useEffect } from 'react';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

export function useZohoAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'zoho-auth-success') {
        try {
          setIsLoading(true);
          setError(null);
          
          const response = await fetch(`/api/zoho/token?code=${encodeURIComponent(event.data.code)}`);
          
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Token exchange failed: ${errorText}`);
          }

          const tokens: AuthResponse = await response.json();
          setIsAuthenticated(true);
          return tokens;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Token exchange failed';
          console.error('Auth error:', errorMessage);
          setError(errorMessage);
          throw err;
        } finally {
          setIsLoading(false);
        }
      } else if (event.data.type === 'zoho-auth-error') {
        const errorMessage = event.data.errorDescription || event.data.error || 'Authentication failed';
        console.error('Auth error from popup:', errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const authenticate = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get auth URL from backend
      const response = await fetch('/api/zoho/auth');
      if (!response.ok) {
        throw new Error('Failed to initialize authentication');
      }

      const { url, state } = await response.json();
      sessionStorage.setItem('zohoAuthState', state);

      // Open popup for authentication
      const width = 600;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const authWindow = window.open(
        url,
        'Zoho Authorization',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      );

      if (!authWindow) {
        throw new Error('Failed to open authorization window. Please allow popups for this site.');
      }

      // Check if popup was closed
      const checkClosed = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkClosed);
          setIsLoading(false);
          if (!isAuthenticated) {
            setError('Authorization window was closed');
          }
        }
      }, 1000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      console.error('Auth error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    authenticate,
    isAuthenticated,
    isLoading,
    error,
  };
}