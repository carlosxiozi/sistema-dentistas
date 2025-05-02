import { NextResponse } from 'next/server';
export async function GET() {
  const response = NextResponse.redirect(new URL('/auth/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));

  // Establece la cookie expirada manualmente
  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
