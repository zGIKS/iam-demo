'use client';

import { useSearchParams } from 'next/navigation';
import { VerificationPage } from '@/components/auth/verify/VerificationPage';

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  return <VerificationPage isSuccess={isSuccess} />;
}