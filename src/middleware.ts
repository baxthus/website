import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  response.headers.set('X-Clacks-Overhead', 'GNU Terry Pratchett');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Apply to all routes except static assets
};
