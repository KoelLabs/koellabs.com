import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_URLS = ['/sign-in', '/sign-up', '/'];

export async function middleware(request: NextRequest) {
  const idToken = request.cookies.get('idtoken');
  const isLoggedIn = idToken && await fetch(new URL('/api/isLoggedin', request.url), {
    headers: {
      Authorization: `Bearer ${idToken['value']}`
    }
  }).then(res => res.json());

  if (!isLoggedIn) {
    // Logged out
    if (PUBLIC_URLS.includes(request.nextUrl.pathname)) {
      return NextResponse.next(); // trying to access public page -> continue
    } else {
      return NextResponse.redirect(new URL('/sign-in', request.url)); // trying to access private page -> redirect to sign-in
    }
  } else {
    // Logged in
    if (request.nextUrl.pathname === '/sign-in') {
      // trying to access sign-in -> redirect to /dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url)); 
    } else {
       // not trying to access sign-in -> continue
      return NextResponse.next();
    }
  } 
  
}
 
export const config = {
  matcher: [
    "/",
    "/((?!_next|api|.*\\.).*)",
  ],
}
