'use client';

import React from "react";

interface MiniCalendarProps {
  semanaDesde: string;
  semanaHasta: string;
  citas: {
    date: string;
    time: string;
  }[];
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ citas }) => {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = Array.from({ length: 10 }, (_, i) => 9 + i); // 9am - 6pm

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const dayNumber = date.getDay();
    const mapping: Record<number, string> = {
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    };
    return mapping[dayNumber];
  };

  const citasMap: Record<string, Record<number, string>> = {};

  citas.forEach((cita) => {
    const day = getDayName(cita.date);
    const hour = parseInt(cita.time.split(":")[0], 10);

    if (day && days.includes(day) && hours.includes(hour)) {
      if (!citasMap[day]) {
        citasMap[day] = {};
      }
      citasMap[day][hour] = "Cita Agendada";
    }
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <h3 className="text-2xl font-bold mb-6 text-center text-black">
        Agenda Semanal
      </h3>

      <div className="overflow-x-auto w-full">
        <div className="grid grid-cols-7 min-w-[1000px] border-t border-l border-gray-200">
          {/* Horas */}
          <div className="border-b border-gray-200">
            <div className="sticky top-0 bg-white py-2 px-4 font-medium text-black text-sm text-center">
              Hora
            </div>
            {hours.map((hour) => (
              <div
                key={hour}
                className="py-6 px-2 border-b border-gray-200 text-center text-xs text-gray-500"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {/* Días */}
          {days.map((day) => (
            <div key={day} className="border-r border-b border-gray-200">
              <div className="sticky top-0 bg-white py-2 px-4 font-semibold text-gray-700 text-center text-sm">
                {day}
              </div>
              {hours.map((hour) => {
                const cita = citasMap[day]?.[hour];
                const isAgendada = cita === "Cita Agendada";

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`py-6 text-xs font-medium text-center transition-all
                      ${isAgendada
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {cita || "Disponible"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
