"use client";

import { useEffect, useState } from "react";

const useAuthValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar sesión (token en cookies o sesión activa)
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Validar si hay sesión en cookies (puedes ajustar a la lógica de tu sesión)
    const session = document.cookie
      .split("; ")
      .find((row) => row.startsWith("next-auth.session-token=")) // Si usas next-auth
      ?.split("=")[1];

    // Si hay un token o una sesión, lo validamos
    if (token || session) {
      setIsAuthenticated(true); // Está autenticado
    } else {
      setIsAuthenticated(false); // No está autenticado
    }
  }, []);

  return isAuthenticated;
};

export default useAuthValidation;
