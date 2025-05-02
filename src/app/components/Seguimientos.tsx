"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// Definimos las props que vamos a recibir
interface SeguimientosChartProps {
  seguimientos: {
    completado: number;
    pendiente: number;
    cancelado: number;
  };
}

const SeguimientosChart: React.FC<SeguimientosChartProps> = ({ seguimientos }) => {
  // Adaptar los datos para el gráfico
  const data = [
    { estado: "Completado", cantidad: seguimientos.completado },
    { estado: "Pendiente", cantidad: seguimientos.pendiente },
    { estado: "Cancelado", cantidad: seguimientos.cancelado },
  ];

  return (
    <div className="h-80 bg-white p-8 rounded-3xl shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Seguimientos
      </h3>

      <ResponsiveBar
        data={data}
        keys={["cantidad"]}
        indexBy="estado"
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "pastel1" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Estado",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Cantidad",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        animate={true}
      />
    </div>
  );
};

export default SeguimientosChart;
