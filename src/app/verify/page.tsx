'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Redirect to backend for verification
      window.location.href = `http://localhost:8081/api/v1/identity/confirm-registration?token=${encodeURIComponent(token)}`;
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to verification...</p>
      </div>
    </div>
  );
}
