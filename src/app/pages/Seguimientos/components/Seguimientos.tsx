'use client';

import { useMemo } from 'react';
import { useGetAppointments, useUpdateAppointments } from '@/src/app/hooks/useAppointments';
import { Appointment } from '@/src/app/models/appointments';
import {
  Card, Col, Row, Spinner, Alert, ListGroup, Button, Badge, Breadcrumb, Container,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useUser } from '@/src/app/Context/UserContext';

export default function Seguimientos() {
  const { data: appointments, isLoading, isError, refetch } = useGetAppointments();
  const { mutate: updateAppointment } = useUpdateAppointments();
  const { user } = useUser();

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    if (user?.role === 'patient') {
      return appointments.filter((a: Appointment) => a.patient_id === Number(user?.id));
    }
    return appointments; 
  }, [appointments, user]);

  // 👉 Agrupamos por estado
  const grouped = useMemo(() => ({
    pending: filteredAppointments.filter((a) => a.status === 'pending'),
    confirmed: filteredAppointments.filter((a) => a.status === 'confirmed'),
    canceled: filteredAppointments.filter((a) => a.status === 'canceled'),
  }), [filteredAppointments]);

  // 👉 Cambiar estado de una cita
  const handleUpdateStatus = (id: number, status: 'confirmed' | 'canceled') => {
    const appointmentToUpdate = appointments?.find((a) => a.id === id);
    if (appointmentToUpdate) {
      updateAppointment(
        { ...appointmentToUpdate, status },
        {
          onSuccess: () => {
            Swal.fire({
              icon: 'success',
              title: `Cita ${status === 'confirmed' ? 'completada' : 'cancelada'} correctamente`,
              confirmButtonText: 'Aceptar',
            });
            refetch();
          },
          onError: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar la cita',
              confirmButtonText: 'Aceptar',
            });
          },
        }
      );
    }
  };

  const statusConfig = {
    pending: { title: 'Pendientes', variant: 'primary' },
    confirmed: { title: 'Completadas', variant: 'success' },
    canceled: { title: 'Canceladas', variant: 'danger' },
  };

  return (
    <Container fluid className="py-4 px-2 bg-light min-vh-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/pages/Dashboard">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Seguimiento de Citas</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="mb-4 text-center">Seguimiento de Citas</h2>

      {isLoading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {isError && (
        <Alert variant="danger" className="text-center">
          Error al cargar las citas.
        </Alert>
      )}

      {!isLoading && !isError && (
        <Row className="g-4">
          {(['pending', 'confirmed', 'canceled'] as const).map((status) => (
            <Col xs={12} md={6} lg={4} key={status}>
              <Card border={statusConfig[status].variant} className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className={`text-${statusConfig[status].variant} text-center`}>
                    {statusConfig[status].title}
                  </Card.Title>

                  <ListGroup variant="flush" className="flex-grow-1">
                    {grouped[status].map((cita) => (
                      <ListGroup.Item key={cita.id}>
                        <div className="fw-bold">{cita.description}</div>
                        <div className="small text-muted">
                          📅 {cita.date} 🕒 {cita.time}
                        </div>

                        {status === 'pending' && (
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            {user?.role !== 'patient' && (
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleUpdateStatus(cita.id, 'confirmed')}
                              >
                                Completar
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleUpdateStatus(cita.id, 'canceled')}
                            >
                              Cancelar
                            </Button>
                          </div>
                        )}
                      </ListGroup.Item>
                    ))}
                    {grouped[status].length === 0 && (
                      <ListGroup.Item className="text-center">
                        <Badge bg="light" text="dark">Sin citas</Badge>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
