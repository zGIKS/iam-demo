'use client';

import { useSearchParams } from 'next/navigation';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useVerifyEmail(token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to verification...</p>
      </div>
    </div>
  );
}
