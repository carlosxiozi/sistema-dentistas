// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',  // Para escanear las páginas
      './components/**/*.{js,ts,jsx,tsx}', // Para escanear los componentes
      './app/**/*.{js,ts,jsx,tsx}',  // Si usas el nuevo sistema de "App Directory" de Next.js
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#3AB0FF',  // Ejemplo de color personalizado
        },
      },
    },
    plugins: [
      
     
    ],
  }
  