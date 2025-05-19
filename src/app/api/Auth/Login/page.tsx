"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTooth as Tooth, FaSun, FaMoon } from "react-icons/fa";
import Swal from "sweetalert2";
import { authenticate } from "../actions/login";
import { useActionState,useEffect,useState } from "react";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [state, dispatch] = useActionState(authenticate, { status: '', message: '' });
 useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            router.push('/pages/Dashboard');
        }
    }, [router]);
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDarkMode(true);
  }, []);
  useEffect(() => {
    if (state.status==='Success') {
      Swal.fire({
        title: 'Login exitoso',
        text: state.message,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        router.push('/pages/Dashboard');
      });
    } else if (state.status === 'AuthError' || state.status === 'ServerError') {
      Swal.fire({
        title: 'Error',
        text: state.message,
        icon: 'error',
      });
    }
  }, [state, router]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 to-white"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row max-w-4xl w-full border border-gray-200 rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-700" : "bg-gray-50"
        } overflow-hidden`}
      >
        <div className="md:w-1/2 w-full hidden md:flex flex-col bg-blue-50">
          <div className="flex-1 relative w-full h-full">
            <Image
              src="/doctora.jpg"
              alt="Imagen Clínica"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center relative">
          <div className="flex justify-center mb-4">
            <Image
              src="/logoD.png"
              alt="Logo del consultorio"
              width={120}
              height={120}
              className="rounded-full border shadow-md"
              priority
            />
          </div>

          <h1 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2 mb-2">
            <Tooth className="w-6 h-6" /> Sistema Dent
          </h1>
          <p className={`text-sm sm:text-base text-center mb-6 ${darkMode ? "text-white" : "text-black"}`}>
            Bienvenido al cuidado dental inteligente. Ingresa para comenzar.
          </p>

          <form action={dispatch} noValidate autoComplete="off" className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Tu correo electrónico"
              className={`w-full h-12 px-4 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm ${darkMode ? "bg-gray-300" : "bg-white"}`}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Tu contraseña"
              className={`w-full h-12 px-4 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm ${darkMode ? "bg-gray-300" : "bg-white"}`}
              required
            />
            <p className={`text-xs text-gray-700 mt-1 ${darkMode ? "text-white" : "text-black"}`}>
              Debe tener entre 8 y 20 caracteres.
            </p>

            <button
              type="submit"
              className="w-full bg-[#3AB0FF] hover:bg-[#2A90D6] text-white font-semibold py-2 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={() => router.push("/api/Auth/Register")}
              className="w-full bg-white text-[#3AB0FF] font-semibold py-2 border border-[#3AB0FF] rounded-lg hover:bg-blue-50 transition cursor-pointer shadow-md hover:scale-105"
            >
              Crear Nueva Cuenta
            </button>
          </form>

          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 p-2 rounded-full border-2 border-gray-400 hover:bg-gray-300 transition-all"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 w-6 h-6" />
            ) : (
              <FaMoon className="text-blue-500 w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
