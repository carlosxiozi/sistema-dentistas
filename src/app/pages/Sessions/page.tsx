'use client';

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/UserContext";
import Loading from "@/src/app/components/Loading";
import Sessions from "./components/Sessions";
import { useGetRole } from "../../hooks/useRol";

const Home = () => {
  const userContext = useUser();
  const role = useGetRole(); 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!userContext || !userContext.user) {
      router.push('/api/auth/login');
      return;
    }

    const roleData = role.data; 

    if (!roleData) {
      return;
    }

    const matchedRole = roleData.find((r) => r.name === userContext?.user?.role);

    if (!matchedRole) {
      router.push('/api/Auth/Login');
      return;
    }

    const hasUsersPermission = matchedRole.permissions?.includes('Sessions');

    if (!hasUsersPermission) {
      router.push('/api/Auth/Login');
      return;
    }

    setIsLoading(false);
  }, [userContext, role, router]);

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <Suspense fallback={<Loading />}>
      <Sessions />
    </Suspense>
  );
};

export default Home;
