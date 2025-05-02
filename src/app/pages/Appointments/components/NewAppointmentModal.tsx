import { Modal, Box, Typography, TextField, Button, MenuItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetAppointments } from '@/src/app/hooks/useAppointments';
import { useGetUser } from '@/src/app/hooks/UseUser';
import { useUser } from '@/src/app/Context/UserContext';
import { useGetService } from '@/src/app/hooks/service';
import { Appointment } from '@/src/app/models/appointments';
import { User, Dentista } from '@/src/app/models/user';
import { Service } from '@/src/app/models/service';
interface NewAppointmentModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (appointment: Appointment) => void;
}

export const NewAppointmentModal = ({ show, onClose, onCreate }: NewAppointmentModalProps) => {
  const { data: appointmentsData } = useGetAppointments();
  const { data: users, isLoading: usersLoading } = useGetUser();
  const { user } = useUser();
  const { data: services = [] } = useGetService();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dentistId, setDentistId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [error, setError] = useState('');

  const hoursOptions = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const dentists = users.filter((user: User) => user.role === 'dentist') || [];

  const validateAppointment = () => {
    if (!date || !time || !dentistId || !serviceName) {
      setError('Todos los campos son requeridos.');
      return false;
    }

    const selectedDate = dayjs(date);

    // No domingos
    if (selectedDate.day() === 0) {
      setError('No se pueden agendar citas en domingo.');
      return false;
    }

    // No fechas pasadas
    if (selectedDate.isBefore(dayjs(), 'day')) {
      setError('No se puede agendar en fechas pasadas.');
      return false;
    }

    const exists = appointmentsData?.some(
      (a) =>
        dayjs(a.date).isSame(selectedDate, 'day') &&
        dayjs(a.time, 'HH:mm:ss').format('HH:mm') === time
    );
    

    if (exists) {
      setError('Ya existe una cita en esta fecha y hora.');
      return false;
    }

    setError('');
    return true;
  };

  const availableHours = () => {
    if (!date) return [];

    const selectedDate = dayjs(date);

    if (selectedDate.day() === 0 || selectedDate.isBefore(dayjs(), 'day')) {
      return [];
    }

    const takenHours = appointmentsData
    ?.filter((a) => dayjs(a.date).isSame(selectedDate, 'day'))
    .map((a) => dayjs(a.time, 'HH:mm:ss').format('HH:mm')) || [];

    return hoursOptions.filter(hour => !takenHours.includes(hour));
  };
  const handleSubmit = () => {
    if (!validateAppointment()) return;

    const newAppointment: Appointment = {
      id: 0, // Placeholder value
      userId: Number(dentistId),
      patient_id: user?.id ? Number(user.id) : 0,
      date,
      time: `${time}:00`,
      status: 'pending',
      description: serviceName,
      createdAt: new Date().toISOString(), // Placeholder value
      updatedAt: new Date().toISOString(), // Placeholder value
    };

    onCreate(newAppointment);
    onClose();
  };

  return (
    <Modal open={show} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" textAlign="center">Nueva Cita</Typography>

        <TextField
          label="Fecha"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime('');
          }}
          fullWidth
        />

        <TextField
          select
          label="Hora"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          disabled={!date}
        >
          {availableHours().length > 0 ? (
            availableHours().map(hour => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              {date ? 'No hay horas disponibles' : 'Selecciona una fecha primero'}
            </MenuItem>
          )}
        </TextField>

        <TextField
          select
          label="Dentista"
          value={dentistId}
          onChange={(e) => setDentistId(e.target.value)}
          fullWidth
          disabled={usersLoading}
        >
          {dentists.map((dentist: Dentista) => (
            <MenuItem key={dentist.id} value={dentist.id}>
              {dentist.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Servicio"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          fullWidth
        >
          {services.map((service: Service) => (
            <MenuItem key={service.id} value={service.name}>
              {service.name}
            </MenuItem>
          ))}
        </TextField>

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Crear Cita
        </Button>
      </Box>
    </Modal>
  );
};
