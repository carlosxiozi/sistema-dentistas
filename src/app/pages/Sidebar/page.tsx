"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDarkMode } from "@/src/app/Context/DarkModeContext";
import { useEffect, useState } from "react";
import { useGetRole } from "@/src/app/hooks/useRol";
import { useUser } from "@/src/app/Context/UserContext";
import { Role } from "@/src/app/models/role";
import {
  Squares2X2Icon,
  UserGroupIcon,
  KeyIcon,
  CalendarIcon,
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  BriefcaseIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const handleLogOut = async () => {
   await fetch('/api/logout');
    window.location.href = '/api/Auth/Login';
};


export default function Sidebar() {
  const { user, loading } = useUser();
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext?.isDarkMode ?? false;
  const pathname = usePathname();
  const { data: roles, isLoading: rolesLoading } = useGetRole();

  const [permissions, setPermissions] = useState<string[]>([]);

  const sections = [
    { name: "Dashboard", icon: Squares2X2Icon, path: "/pages/Dashboard" },
    { name: "Users", icon: UserGroupIcon, path: "/pages/User" },
    { name: "Roles", icon: KeyIcon, path: "/pages/Roles" },
    { name: "Configuración", icon: Cog8ToothIcon, path: "/pages/Config" },
    { name: "Servicios", icon: BriefcaseIcon, path: "/pages/Tratamientos" }, // Updated icon
    { name: "Role-Assignment", icon: ArrowPathIcon, path: "/pages/RoleAssigment" },
    { name: "Appointments", icon: CalendarIcon, path: "/pages/Appointments" },
    { name: "Historial-Clinico", icon: UserGroupIcon, path: "/pages/HistorialClinico" }, // Updated icon for patients
    { name: "Historial", icon: BookOpenIcon, path: "/pages/Historial" },
    { name: "ChatRapido", icon: ChatBubbleLeftEllipsisIcon, path: "/pages/ChatRapido" }, // Updated icon for chat
    { name: "Sessions", icon: ClockIcon, path: "/pages/Sessions" },
    { name: "Seguimientos", icon: ChartBarIcon, path: "/pages/Seguimientos" },
  ];

  // Cuando tengo roles y user, busco los permisos de su rol
  useEffect(() => {
    if (roles && user) {
      const roleFound = roles.find((r: Role) => r.name.toLowerCase() === user.role.toLowerCase());
      if (roleFound) {
        setPermissions(roleFound.permissions || []);
      } else {
        setPermissions([]);
      }
    }
  }, [roles, user]);
  const filteredSections = sections.filter(section => permissions.includes(section.name));

  if (loading || rolesLoading) {
    return (
      <aside className="w-20 md:w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center p-6 animate-pulse min-h-screen">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
      </aside>
    );
  }
  return (
    <aside className={`w-20 md:w-64 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} shadow-lg flex flex-col p-4 items-center md:items-start transition-all duration-300 min-h-screen`}>

      {/* Logo */}
      <div className="mb-4 w-full flex justify-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
          <Image src="/logoD.png" alt="Logo" width={80} height={80} />
        </div>
      </div>

      {/* Nombre de usuario */}
      <div className="text-sm font-semibold mb-4 hidden md:block text-center w-full">
        Hola, {user?.name || "Invitado"}
      </div>

      <hr className="my-2 w-full border-gray-200 dark:border-gray-700" />

      {/* Navegación */}
      <nav className="flex flex-col space-y-2 w-full flex-grow mt-4">
        {filteredSections.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-lg transition-all font-medium text-base group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700"
              }`}
            >
              <Icon
                className={`h-6 w-6 transform transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-black"
                }`}
              />
              <span className="hidden md:inline">{name}</span>
            </Link>
          );
        })}

        {/* Cerrar sesión */}
        <button
          onClick={handleLogOut}
          className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium text-base w-full mt-6 group"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110 text-black" />
          <span className="hidden md:inline">Cerrar sesión</span>
        </button>
      </nav>

      <div className="mt-8 w-full text-center hidden md:block text-[10px] text-gray-500 dark:text-gray-400">
        V1.00 Sistema Dentista
      </div>

    </aside>
  );
}
