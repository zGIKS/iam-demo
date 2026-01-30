'use client';

import { useSearchParams } from 'next/navigation';
import { VerificationPage } from '@/components/auth/verify/VerificationPage';

export default function EmailVerificationFailedPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'The verification link is invalid or has expired.';

  return <VerificationPage isSuccess={false} message={message} />;
}