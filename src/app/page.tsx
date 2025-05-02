"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const token = (await cookies()).get('token')?.value;

  if (token) {
    redirect("/pages/Dashboard");
  }

  redirect("/api/Auth/Login");
}
