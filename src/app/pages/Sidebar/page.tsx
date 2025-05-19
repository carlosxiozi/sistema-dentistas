'use client';

import Link from "next/link";
import {  usePathname } from "next/navigation";
import Image from "next/image";
import { useDarkMode } from "@/src/app/Context/DarkModeContext";
import { useEffect, useState } from "react";
import { useGetRole } from "@/src/app/hooks/useRol";
import { useUser } from "@/src/app/Context/UserContext";
import { Role } from "@/src/app/models/role";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosChatboxes, IoIosCloseCircle, IoMdSettings } from "react-icons/io";
import { MdDashboard, MdMiscellaneousServices, MdWorkHistory } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { TbClipboardList } from "react-icons/tb";
import { FaUsers, FaUserShield, FaShieldAlt, FaCalendarAlt, FaHistory } from "react-icons/fa";
const handleLogOut = async () => {
  await fetch("/api/logout")
  window.location.href = "/";
 };

export default function Sidebar() {
  const { user, loading } = useUser();
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext?.isDarkMode ?? false;
  const pathname = usePathname();
  const { data: roles, isLoading: rolesLoading } = useGetRole();

  const [permissions, setPermissions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { name: "Dashboard", icon: MdDashboard, path: "/pages/Dashboard" },
    { name: "Users", icon: FaUsers, path: "/pages/User" },
    { name: "Roles", icon: FaUserShield, path: "/pages/Roles" },
    { name: "Configuración", icon: IoMdSettings, path: "/pages/Config" },
    { name: "Servicios", icon: MdMiscellaneousServices, path: "/pages/Tratamientos" },
    { name: "Rol-Asignar", icon: FaShieldAlt, path: "/pages/RoleAssigment" },
    { name: "Citas", icon: FaCalendarAlt, path: "/pages/Appointments" },
    { name: "Historial-Clinico", icon: TbClipboardList, path: "/pages/HistorialClinico" },
    { name: "Historial", icon: MdWorkHistory, path: "/pages/Historial" },
    { name: "Respuestas-Rapidas", icon: IoIosChatboxes, path: "/pages/ChatRapido" },
    { name: "Sessions", icon: FaHistory, path: "/pages/Sessions" },
    { name: "Seguimientos", icon: BsBarChartFill, path: "/pages/Seguimientos" },
  ];

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

  const filteredSections = sections.filter((section) => permissions.includes(section.name));

  if (loading || rolesLoading) {
    return (
      <aside className="w-20 md:w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center p-6 animate-pulse min-h-screen sticky top-0">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
      </aside>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-30"
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          w-56 md:w-64
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
          flex flex-col px-6 py-4
          h-screen md:h-auto overflow-y-auto md:overflow-visible
        `}
      >
        <div className="w-full flex justify-center mb-2">
          <div className="rounded-full overflow-hidden hover:scale-180 transition-transform duration-300">
            <Image src="/logoD.png" alt="Logo" width={60} height={40} />
          </div>
        </div>
        <hr className="w-full border-gray-300 dark:border-gray-700 my-2" />

        <nav className="flex flex-col gap-3 w-full flex-1">
          {filteredSections.map(({ name, icon: Icon, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-300 dark:hover:bg-gray-300"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    isActive ? "text-white" : isDarkMode ? "text-gray-300" : "text-black"
                  }`}
                />
                <span className="font-medium">{name}</span>
              </Link>
            );
          })}

          <button
            onClick={async () => {
              await handleLogOut();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-base w-full mt-4 md:mt-0"
          >
            <IoIosCloseCircle
              className={`h-6 w-6 ${isDarkMode ? "text-red-500" : "text-red-500"}`}
            />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </nav>

        <div className="w-full text-center text-[10px] text-gray-500 dark:text-gray-400 mt-4 hidden md:block">
          V1.00 Sistema Dentista
        </div>
      </aside>
    </>
  );
}
