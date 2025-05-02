// app/api/user/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const user = {
      id: payload.userId,
      name: payload.userName,
      role: payload.userRole,
      email: payload.userEmail,
      phone: payload.userPhone,
      address: payload.userAddress,
      city: payload.userCity,
      state: payload.userState,
      apiToken: payload.apiToken,
    };

    console.log('datos:', user); // Para verificar en servidor

    return NextResponse.json({ user });
  } catch (err) {
    console.error('Error verificando JWT:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
