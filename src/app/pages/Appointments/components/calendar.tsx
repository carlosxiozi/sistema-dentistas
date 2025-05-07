'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { memo } from 'react';
import { Spinner } from 'react-bootstrap';

interface CalendarSectionProps {
  events: { title: string; start: string; end?: string; allDay?: boolean }[];
}

function CalendarComponent({ events }: CalendarSectionProps) {
  if (!events) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" />
      </div>
    );
  }
  
  return (
    <div className="w-full">
     <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  headerToolbar={{
    left: 'today prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  }}
  events={events}
  editable={false}
  selectable={true}
  nowIndicator={true}
  locale="es"
  dayMaxEventRows={true}
  dayMaxEvents={4}
  fixedWeekCount={false}
  eventDisplay="block"
  slotMinTime="09:00:00"
  slotMaxTime="18:00:00"
  height="auto"
  aspectRatio={1.5}
  windowResize={() => {}}
  buttonText={{
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
  }}
  themeSystem="bootstrap5" // 👈 importante para que clases sean más limpias
/>

    </div>
  );
}

export default memo(CalendarComponent);
