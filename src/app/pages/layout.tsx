"use client";

import Providers from "../providers/providers";
import Navbar from "./Menu/page";
import Sidebar from "./Sidebar/page";
import { UserProvider } from "../Context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DarkModeProvider } from "@/src/app/Context/DarkModeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DarkModeProvider>
        <LayoutContent>{children}</LayoutContent>
      </DarkModeProvider>
    </UserProvider>
  );
}

// Este componente ya tiene acceso al contexto
import { useDarkMode } from "@/src/app/Context/DarkModeContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext?.isDarkMode ?? false;

  return (
    <div
      className={`flex min-h-screen w-screen transition-all duration-300 ${isDarkMode ? "bg-gray-900" : "bg-blue-100"
        }`}
    >
   
      <Sidebar />
      
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Providers>{children}</Providers>
        </main>
      </div>
    </div>
  );
}
