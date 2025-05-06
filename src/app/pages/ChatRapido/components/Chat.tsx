"use client";

import { useState } from "react";

// 📋 Preguntas frecuentes
const preguntasFrecuentes = [
  { pregunta: "¿Cuál es el horario de atención?", respuesta: "Nuestro horario es de lunes a viernes de 9:00 a.m. a 6:00 p.m. y sábados de 9:00 a.m. a 2:00 p.m." },
  { pregunta: "¿Dónde están ubicados?", respuesta: "Estamos ubicados en Av. Siempre Viva #123, Col. Centro, CDMX." },
  { pregunta: "¿Cuánto cuesta una limpieza dental?", respuesta: "El costo de la limpieza dental es de $800 MXN. Incluye limpieza profunda y pulido dental." },
  { pregunta: "¿Atienden urgencias dentales?", respuesta: "Sí, atendemos urgencias. Comunícate al 55-1234-5678 para atención inmediata." },
  { pregunta: "¿Aceptan seguros dentales?", respuesta: "Sí, trabajamos con varias aseguradoras. Consulta con nosotros para más detalles." },
  { pregunta: "¿Qué tratamientos ofrecen?", respuesta: "Ofrecemos ortodoncia, blanqueamiento, implantes, carillas, endodoncia y limpiezas profesionales." },
  { pregunta: "¿Puedo agendar una cita en línea?", respuesta: "¡Claro! Agenda tu cita aquí: www.consultoriodental.com/citas" },
  { pregunta: "¿Tratan a niños?", respuesta: "Sí, contamos con especialistas en odontopediatría para el cuidado dental de los más pequeños." },
  { pregunta: "¿Cuánto cuesta una consulta de valoración?", respuesta: "La consulta de valoración tiene un costo de $300 MXN e incluye revisión completa y diagnóstico." },
  { pregunta: "¿Ofrecen planes de pago?", respuesta: "Sí, contamos con facilidades de pago para tratamientos de ortodoncia y rehabilitación dental." },
];

export default function ChatConsultorio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-xl space-y-3">
        {preguntasFrecuentes.map((item, index) => (
          <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
            <button
              onClick={() => handleToggle(index)}
              className={`w-full text-left px-4 py-3 flex justify-between items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {item.pregunta}
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
              } text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800`}
              style={{ transitionProperty: "max-height, opacity, padding" }}
            >
              {item.respuesta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
