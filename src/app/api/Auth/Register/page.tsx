"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRegister } from "@/src/app/hooks/UserAuth";
import { useRouter } from "next/navigation";
import {
  FaTooth as Tooth,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [role] = useState("patient");
  const [isActive] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { mutate: registerUser } = useRegister();
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode === "true");
  }, []);

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword || !phone || !address || !city || !state) {
      Swal.fire({ title: 'Campos incompletos', text: 'Por favor completa todos los campos.', icon: 'warning' });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ title: 'Contraseñas no coinciden', text: 'Verifica que ambas contraseñas sean iguales.', icon: 'error' });
      return;
    }

    const userData = {
      name, email, password, role, phone, address, city, state, is_active: isActive ? 1 : 0,
    };

    registerUser(userData, {
      onSuccess: () => {
        Swal.fire({ title: 'Registro exitoso, ya puede iniciar sesión', text: 'Bienvenido 😄', icon: 'success' }).then(() => {
          router.push('/api/Auth/Login');
        });
      },
      onError: () => {
        Swal.fire({ title: 'Error al registrar', text: 'Hubo un problema con el registro.', icon: 'error' });
      }
    });
  };

  const inputStyle = `w-full h-12 pl-10 pr-4 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm ${darkMode ? "placeholder-gray-300" : "placeholder-black"}`;
  const iconStyle = "absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 text-xl";


  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 to-white text-black"
      }`}>
      <div className={`flex flex-col max-w-6xl w-full border border-gray-200 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-900" : "bg-white"
        } overflow-hidden`}>

        <div className="w-full p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <Image src="/logoD.png" alt="Logo del consultorio" width={120} height={120} className="rounded-full border shadow-md" priority />
          </div>

          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2 mb-2">
            <Tooth className="w-6 h-6" /> Sistema Dent
          </h1>
          <p className="text-sm sm:text-base text-center mb-6">
            Únete a nuestro sistema de cuidado dental. Regístrate para comenzar.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">

              {/* Nombre */}
              <div className="relative">
                <FaUser  className={iconStyle} />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full h-12 pl-10 pr-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm ${darkMode ? "placeholder-gray-300" : "placeholder-black"}`}
                  required
                />
              </div>


              {/* Correo */}
              <div className="relative">
                <FaEnvelope   className={iconStyle}/>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <FaLock className={iconStyle} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative">
                <FaLock className={iconStyle} />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="relative">
                <FaPhone className={iconStyle} />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Dirección */}
              <div className="relative">
                <FaMapMarkerAlt className={iconStyle} />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Ciudad */}
              <div className="relative">
                <FaCity className={iconStyle} />
                <input
                  type="text"
                  placeholder="Ciudad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              {/* Estado */}
              <div className="relative">
                <FaMapMarkerAlt className={iconStyle} />
                <input
                  type="text"
                  placeholder="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-[#3AB0FF] cursor-pointer hover:bg-[#2A90D6] text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Crear Cuenta
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full bg-white text-[#3AB0FF] border cursor-pointer border-[#3AB0FF] font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
