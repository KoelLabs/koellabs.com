import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie, setSessionCookie } from 'better-auth/cookies';

const PUBLIC_URLS = [
  new RegExp('^/$'),
  new RegExp('^/blog$'),
  new RegExp('^/blog/.*$'),
  new RegExp('^/pricing$'),
  new RegExp('^/about$'),
  new RegExp('^/contact$'),
  new RegExp('^/previews$'),
  new RegExp('^/research$'),
  new RegExp('^/research/.*$'),
];

export async function middleware(request: NextRequest) {
  if (PUBLIC_URLS.some(regex => regex.test(request.nextUrl.pathname))) {
    return NextResponse.next(); // trying to access public page -> continue
  }

  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // Auth checks should be handled in each page/route
  if (!sessionCookie) {
    // Logged out
    if (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up') {
      // trying to access sign-in or sign-up -> continue
      return NextResponse.next();
    } else {
      // trying to access private page -> redirect to sign-in (disabled for now)

      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  } else {
    // Logged in
    if (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up') {
      // trying to access sign-in or sign-up -> redirect to /dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // not trying to access sign-in or sign-up -> continue
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - .swa (Azure Static Web Apps)
     * - _next (Next.js internal paths)
     * - api (API routes)
     * - paths with file extensions (e.g., .css, .js, .png, etc.)
     */
    '/((?!_next|api|.*\\.|.swa).*)',
    '/',
  ],
};
