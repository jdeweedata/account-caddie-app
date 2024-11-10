'use client';

import { useZohoAuth } from '@/components/ZohoAuthProvider';

export function SomeComponent() {
  const { isAuthenticated, tokens } = useZohoAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>Authenticated</div>
      ) : (
        <div>Not authenticated</div>
      )}
    </div>
  );
} 