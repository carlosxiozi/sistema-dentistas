"use client";

import { redirect } from "next/navigation";
import { useUser } from "./Context/UserContext";

export default function Home() {
  const userContext = useUser();

  if (!userContext) {
    redirect("/pages/Dashboard");
  }

  redirect("/api/Auth/Login");
}
