// app/api/zoho/auth/callback/route.ts
'use client';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const state = searchParams.get('state');
    
    console.log('Callback received with:', {
      code: code ? 'present' : 'missing',
      error,
      errorDescription,
      state,
    });

    if (error || errorDescription) {
      console.error('Auth error:', { error, errorDescription });
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head><title>Authorization Failed</title></head>
          <body>
            <script>
              window.opener?.postMessage({
                type: 'zoho-auth-error',
                error: "${error || 'Unknown error'}",
                errorDescription: "${errorDescription || ''}"
              }, '*');
              setTimeout(() => window.close(), 1000);
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    if (!code) {
      console.error('No authorization code received');
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head><title>Authorization Failed</title></head>
          <body>
            <script>
              window.opener?.postMessage({
                type: 'zoho-auth-error',
                error: 'No authorization code received'
              }, '*');
              setTimeout(() => window.close(), 1000);
            </script>
            <p>Authorization failed. This window will close automatically.</p>
          </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    console.log('Authorization successful, sending code back to opener');
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Authorization Successful</title></head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'zoho-auth-success',
              code: "${code}"
            }, '*');
            setTimeout(() => window.close(), 1000);
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Callback error:', error);
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'zoho-auth-error',
              error: 'Authorization failed'
            }, '*');
            setTimeout(() => window.close(), 1000);
          </script>
          <p>An error occurred. This window will close automatically.</p>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}