import { useState } from 'react';

interface SignInData {
  email: string;
  password: string;
}

interface UseSignInReturn {
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useSignIn(): UseSignInReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (data: SignInData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        const errorMessage = result.error || 'Invalid credentials';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, error };
}