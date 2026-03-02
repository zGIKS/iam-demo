import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_COOKIE_NAME } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // Routes that require protection
  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    if (!token) {
      // No token, redirect to sign-in
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const verifyRes = await fetch(
          `${apiUrl}/api/v1/auth/verify?token=${encodeURIComponent(token)}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (verifyRes.ok) {
          const verifyData = await verifyRes.json();
          if (!verifyData.is_valid) {
            const response = NextResponse.redirect(new URL('/sign-in', request.url));
            response.cookies.delete(TOKEN_COOKIE_NAME);
            response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
            return response;
          }
        } else if (verifyRes.status === 400 || verifyRes.status === 401) {
          // Explicit auth failure from backend.
          const response = NextResponse.redirect(new URL('/sign-in', request.url));
          response.cookies.delete(TOKEN_COOKIE_NAME);
          response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
          return response;
        }
        // For transient backend failures (5xx, network edge cases), keep the user flow.
      } catch (error) {
        console.error('Token verification error in proxy:', error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
