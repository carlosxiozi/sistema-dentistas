import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect('/');

  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    domain: '.itblackbox.site', // si usas subdominios
    // o quítalo si no usas subdominios
  });

  return response;
}
