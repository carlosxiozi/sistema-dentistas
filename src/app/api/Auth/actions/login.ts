"use server";

import { cookies } from "next/headers";
import { SignJWT } from 'jose';
import { UserAuth } from "@/src/app/service/UserAuth";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

interface UserData {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  state: string;
}

interface LoginResponse {
  type: string;
  data?: {
    token: string;
    user: UserData;
  };
}

export async function authenticate(
  state: { status: string; message?: string } | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    if (!email || !password) {
      return {
        status: "MissingCredentials",
        message: "Por favor, ingresa tu email y contraseña.",
      };
    }

    const response = await new UserAuth().login(email, password) as LoginResponse;

    if (response.type === "error") {
      return {
        status: "CredentialsSign",
        message: "Credenciales inválidas.",
      };
    }

    if (!response.data || !response.data.user || !response.data.token) {
      return {
        status: "AuthError",
        message: "Respuesta de autenticación incompleta.",
      };
    }

    const { id, name, role, email: userEmail, phone, address, city, state } = response.data.user;
    const apiToken = response.data.token;

    const jwt = await new SignJWT({
      userId: id,
      userName: name,
      userRole: role,
      userEmail: userEmail, // ahora bien
      userPhone: phone,
      userAddress: address,
      userCity: city,
      userState: state,
      apiToken,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);
    

    const cookieStore = await cookies();

    cookieStore.set('token', jwt, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Muy recomendable para seguridad
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return {
      status: "Success",
      user: { id, name, role, email: userEmail, phone, address, city, state },
    };
  } catch (error) {
    console.error('Authenticate error:', error);
    return {
      status: "ServerError",
      message: "Algo salió mal. Intenta más tarde.",
    };
  }
}
