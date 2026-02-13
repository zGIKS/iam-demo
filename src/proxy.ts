import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKEN_COOKIE_NAME } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  // Get the token from cookies
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

    // Optional: Verify token with backend
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
      if (!apiUrl) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      const verifyUrl = new URL('/api/v1/auth/verify', apiUrl);
      verifyUrl.searchParams.set('token', token);

      const verifyRes = await fetch(verifyUrl.toString(), {
        method: 'GET',
      });

      if (!verifyRes.ok) {
        // Token invalid, clear cookie and redirect
        const response = NextResponse.redirect(new URL('/sign-in', request.url));
        response.cookies.delete('auth_token');
        return response;
      }

      const verifyData = await verifyRes.json();
      if (!verifyData.is_valid) {
        const response = NextResponse.redirect(new URL('/sign-in', request.url));
        response.cookies.delete('auth_token');
        return response;
      }
    } catch (error) {
      console.error('Token verification error:', error);
      // On error, redirect to login
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
