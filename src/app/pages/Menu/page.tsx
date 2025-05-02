"use client";

import { useState } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaBell, FaUserCircle, FaSun, FaMoon, FaCog, FaChevronDown } from "react-icons/fa";
import { useDarkMode } from "@/src/app/Context/DarkModeContext";
import { redirect } from "next/navigation";
import { useUser } from "@/src/app/Context/UserContext";
import { useGetNoti } from "@/src/app/hooks/notifications";

export default function Navbar() {
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext?.isDarkMode ?? false;
  const toggleDarkMode = darkModeContext?.toggleDarkMode ?? (() => {});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUser();
  const notificaciones = useGetNoti().data;

  // 🔍 Filtramos las notificaciones según el rol
  const userNotifications = notificaciones
    ? notificaciones.filter((noti) => {
      if (user?.role === "patient") {
        return noti.title === "Nuevo servicio agregado";
      }
      return true; // Si no es patient, ve todas
    })
    : [];

  const unreadCount = userNotifications.filter((noti) => !noti.isRead).length;

  const handleLogOut = async () => {
    await fetch("/api/logout");
    window.location.href = "/api/Auth/Login";
  };

  const markAsRead = (id : number) => {
    // Aquí puedes hacer una petición al backend para marcar como leída si tienes API
    // Por ahora solo console.log para ejemplo
    console.log(`Notificación ${id} marcada como leída`);
  };

  return (
    <header
      className={`px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 
      ${isDarkMode ? "bg-gray-900 border-b border-gray-700 text-white" : "bg-white border-b border-gray-200 text-black"} 
      shadow-sm`}
    >
      {/* Parte Izquierda */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
        <div className="flex items-center space-x-2 group mb-2 md:mb-0">
          <HiOutlineBuildingOffice2 className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold leading-5 group-hover:opacity-80">
              Consultorio Dental
            </span>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Dra. Neyra Cruz de Paz
            </span>
          </div>
        </div>

        {/* Cédula Profesional */}
        <div className="hidden md:flex flex-col border-l border-gray-300 dark:border-gray-700 pl-6">
          <span className="text-xs text-gray-500 dark:text-gray-400">Cédula Profesional</span>
          <span className="text-sm font-semibold">7818621</span>
        </div>
      </div>

      {/* Parte Derecha */}
      <div className="flex items-center justify-end space-x-4 mt-3 md:mt-0 bg-blue-100 p-2 rounded-xl">
        {/* Notificaciones */}
        <div className="relative">
          <FaBell
            className="w-6 h-6 text-blue-500 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-lg shadow-xl z-50
      ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
    `}>
              <div className="p-4">
                {userNotifications.length === 0 ? (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">No tienes notificaciones</p>
                ) : (
                  userNotifications.map((noti, index) => (
                    <div
                      key={noti.id}
                      onClick={() => markAsRead(noti.id)}
                      className={`cursor-pointer py-2 px-2 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${!noti.isRead ? "relative" : ""
                        }`}
                    >
                      {/* Indicador no leído */}
                      {!noti.isRead && (
                        <span className="absolute top-3 left-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                      <div className="ml-4">
                        <p className="font-medium text-sm">{noti.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{noti.message}</p>
                      </div>
                      {index !== userNotifications.length - 1 && (
                        <hr className="my-2 border-gray-200 dark:border-gray-600" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-700 transition-all"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FaMoon className="w-5 h-5 text-blue-500" />
          )}
        </button>

        {/* Perfil */}
        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-all"
          >
            <FaUserCircle className="w-7 h-7 text-blue-500" />
            <FaCog className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            <FaChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-300" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => redirect("/pages/Config")}
              >
                Mi cuenta
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600" />
              <div
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={handleLogOut}
              >
                Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
