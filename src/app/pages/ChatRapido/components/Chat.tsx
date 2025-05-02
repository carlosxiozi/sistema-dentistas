"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessages from "@/src/app/pages/ChatRapido/components/ChatMessages";
import ChatInput from "@/src/app/pages/ChatRapido/components/ChatInput";

// 📋 10 Preguntas y respuestas frecuentes
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
  const [mensajes, setMensajes] = useState<{ sender: string; content: string; timestamp: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handlePreguntaSeleccionada = (pregunta: string, respuesta: string) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Agregamos pregunta y respuesta automática al chat
    setMensajes(prev => [
      ...prev,
      { sender: "paciente", content: pregunta, timestamp: horaActual },
      { sender: "dentista", content: respuesta, timestamp: horaActual }
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 dark:bg-gray-900">
      {/* Primero mostramos las preguntas como botones */}
      <div className="p-4 border-b bg-white dark:bg-gray-800">
        <ChatInput preguntas={preguntasFrecuentes} onPreguntaSeleccionada={handlePreguntaSeleccionada} />
      </div>

      {/* Después mostramos el chat de mensajes */}
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages mensajes={mensajes} bottomRef={bottomRef} />
      </div>
    </div>
  );
}
