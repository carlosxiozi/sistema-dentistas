import { getServerSession } from "next-auth";
import { authOptions } from "./auth";  // Asegúrate de importar la configuración de auth

export const auth = async () => {
  return await getServerSession(authOptions);
};
