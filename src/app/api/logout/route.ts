import { NextResponse } from 'next/server';

export async function GET() {
  const redirectUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const response = NextResponse.redirect(new URL('/', redirectUrl));

  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    domain: '.itblackbox.site', // <-- si usas subdominios, podrías necesitar esto
  });

  return response;
}
