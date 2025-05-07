'use client';

import { useMemo, useState, useEffect } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { dayjsLocalizer } from 'react-big-calendar';
import { useGetAppointments, useCreateAppointments } from '@/src/app/hooks/useAppointments';
import { Appointment } from '@/src/app/models/appointments';
import { NewAppointmentModal } from '../components/NewAppointmentModal';
import Swal from 'sweetalert2';
import CalendarSection from '../components/calendar';
import { FaSyncAlt } from 'react-icons/fa';

export default function Appointments() {
  const [isSpinning, setIsSpinning] = useState(false);
  const { data: appointmentsData, isLoading, isError, refetch } = useGetAppointments();
  const { mutate: createAppointment } = useCreateAppointments();

  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const localizer = useMemo(() => {
    if (typeof window !== "undefined") {
      dayjs.locale('es');
      return dayjsLocalizer(dayjs);
    }
    return null;
  }, []);

  useEffect(() => {
    if (appointmentsData) {
      setAppointments(appointmentsData);
    }
  }, [appointmentsData]);

  const events = useMemo(() => {
    return appointments
      .filter((appointment) => appointment.status === 'pending')
      .map((appointment) => {
      const formattedDate = dayjs(appointment.date).format('YYYY-MM-DD');
      const dateTimeString = `${formattedDate}T${appointment.time}`;
      const start = new Date(dateTimeString).toISOString();
      const end = new Date(new Date(dateTimeString).getTime() + 30 * 60 * 1000).toISOString();

      return {
        title: appointment.description || 'Cita',
        start,
        end,
        allDay: false,
      };
    });
  }, [appointments]);

  const handleCreateAppointment = (appointment: Appointment) => {
    createAppointment(appointment, {
      onSuccess: () => {
        Swal.fire({
          title: '¡Cita agendada!',
          text: 'La agenda se actualizó automáticamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setShowModal(false);
        setAppointments(prev => [...prev, appointment]);
      },
      onError: () => {
        Swal.fire({
          title: 'Error al agendar la cita.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  };

  const handleRefresh = async () => {
    setIsSpinning(true);

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Actualizando datos...',
      showConfirmButton: false,
      timer: 1200,
    });

    try {
      await Promise.all([refetch()]);
    } catch {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error al actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsSpinning(false);
      return;
    }

    setTimeout(() => {
      setIsSpinning(false);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Actualización completada',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 300);
  };

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Button variant="primary" onClick={() => setShowModal(true)} className="w-full sm:w-auto">
          Nueva cita
        </Button>

        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto text-sm bg-white text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 transition-all duration-200 ease-in-out shadow"
        >
          <FaSyncAlt className={isSpinning ? 'animate-spin-once' : ''} />
          Actualizar
        </button>
      </div>

      {/* CONTENIDO */}
      {isLoading ? (
        <div className="flex justify-center my-8">
          <Spinner animation="border" role="status" />
        </div>
      ) : isError ? (
        <Alert variant="danger" className="text-center">Error al cargar las citas</Alert>
      ) : !localizer ? (
        <div className="flex justify-center my-8">
          <Spinner animation="border" role="status" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="alert alert-info text-center">No hay citas agendadas todavía.</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
          <CalendarSection events={events} />
        </div>
      )}

      <NewAppointmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateAppointment}
      />
    </div>
  );
}
