import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAuth = request.cookies.get("auth");

  if (isAuth && path !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  else if(!isAuth && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/', '/login'],
}