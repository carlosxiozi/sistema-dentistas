"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface User {
  id: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  apiToken: string; // Added apiToken property
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refetchUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user', { credentials: 'include' });
      
      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      
      if (!data.user) {
        setUser(null);
        return;
      }

      setUser({
        id: data.user.id,
        role: data.user.role, // 👈 ahora correctamente "role", no "rol"
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        address: data.user.address,
        city: data.user.city,
        state: data.user.state,
        apiToken: data.user.api_token,
      });

      // console.log('Usuario cargado:', data.user); // Descomentar solo en dev
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);