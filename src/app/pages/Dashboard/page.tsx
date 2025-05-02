'use client';

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/UserContext";
import Loading from "@/src/app/components/Loading";
import DashboardPage from "./components/page";
import { useGet } from "@/src/app/hooks/historial";

const Home = () => {
  const userContext = useUser();
  const router = useRouter();
  const historial = useGet();

  useEffect(() => {
    if (!userContext) {
      router.push('/api/auth/login');
      return;
    }
    if (userContext.user?.role === 'patient') {
      if (!historial.data) {
        return; // espera a que cargue historial
      }
      const userId = Number(userContext.user?.id);
      const historialEntry = historial.data.find(
        (h) => Number(h.paciente_id) === userId
      );
      if (historialEntry) {
        router.push('/pages/Historial');
      } else {
        router.push('/pages/Appointments');
      }
    }
  }, [userContext, historial.data, router]);
  return (
    <Suspense fallback={<Loading />}>
      <DashboardPage />
    </Suspense>
  );
};

export default Home;