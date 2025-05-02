import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/auth/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!pathname.startsWith('/pages')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token || typeof token !== 'string') {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error("JWT_SECRET no está definido.");
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(secretKey);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.warn('Token inválido o expirado:', err);
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/pages/:path*'],
};
