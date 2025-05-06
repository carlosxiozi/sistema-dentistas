"use client";

import React from "react";
import MetricCard from "@/src/app/components/MetricCard";
import MiniCalendar from "@/src/app/components/MiniCalendar";
import SeguimientosChart from "@/src/app/components/Seguimientos";
import { FaUsers, FaUserShield, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import { useGetUser } from "@/src/app/hooks/UseUser";
import { useGetRole } from "@/src/app/hooks/useRol";
import { useGetAppointments } from "@/src/app/hooks/useAppointments";
import Loading from "@/src/app/components/Loading";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DashboardPage = () => {
  const { data: users, isLoading: usersLoading } = useGetUser();
  const { data: roles, isLoading: rolesLoading } = useGetRole();
  const { data: appointments, isLoading: appointmentsLoading } = useGetAppointments();

  if (usersLoading || rolesLoading || appointmentsLoading) {
    return <Loading />;
  }

  const usersCount = users?.length || 0;
  const rolesCount = roles?.length || 0;
  const appointmentsCount = appointments?.filter((a) => a.status === "pending").length || 0;

  const seguimientos = {
    completado: appointments?.filter((a) => a.status === "confirmed").length || 0,
    pendiente: appointments?.filter((a) => a.status === "pending").length || 0,
    cancelado: appointments?.filter((a) => a.status === "canceled").length || 0,
  };

  const totalSeguimientos = seguimientos.completado + seguimientos.cancelado;

  const today = dayjs();
  const dayOfWeek = today.day();
  const monday = today.subtract(dayOfWeek === 0 ? 6 : dayOfWeek - 1, "day").startOf("day");
  const saturday = monday.add(5, "day").endOf("day");

  const citasSemana =
  appointments?.filter((a) => {
    const citaDateStr = `${a.date.split(' ')[0]} ${a.time}`;
    const citaDate = dayjs(citaDateStr, "YYYY-MM-DD HH:mm:ss");
    
    if (!citaDate.isValid()) {
      console.warn("Fecha inválida:", citaDateStr);
      return false;
    }

    return (
      citaDate.isSameOrAfter(monday.startOf('day')) &&
      citaDate.isSameOrBefore(saturday.endOf('day'))
    );
  }) || [];

  return (
    <div
      className="
        p-8 
        bg-blue-50 
        transition-all 
        overflow-y-auto 
        h-[calc(100vh-80px)]
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-black">Bienvenido al Dashboard</h1>
          <p className="text-lg text-gray-700 mt-2">
            Tienes {appointmentsCount} citas pendientes y {seguimientos.pendiente} seguimientos
            pendientes.
          </p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Usuarios"
          value={usersCount}
          subtitle="+5 esta semana"
          icon={<FaUsers />}
        />
        <MetricCard
          title="Roles"
          value={rolesCount}
          subtitle="+1 nuevo"
          icon={<FaUserShield />}
        />
        <MetricCard
          title="Citas Pendientes"
          value={appointmentsCount}
          subtitle="Próxima 14:00h"
          icon={<FaCalendarAlt />}
        />
        <MetricCard
          title="Seguimientos"
          value={totalSeguimientos}
          subtitle={`${seguimientos.completado} completados`}
          icon={<FaChartLine />}
        />
      </div>

      {/* Mini calendario */}
      <div className="mb-12">
        <MiniCalendar
          citas={citasSemana}
          semanaDesde={monday.format("DD/MM/YYYY")}
          semanaHasta={saturday.format("DD/MM/YYYY")}
        />
      </div>

      {/* Seguimiento Chart */}
      <div className="mb-12">
        <SeguimientosChart seguimientos={seguimientos} />
      </div>
    </div>
  );
};

export default DashboardPage;
