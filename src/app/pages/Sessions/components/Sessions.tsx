'use client';

import { Box, Typography, Paper, IconButton, CircularProgress, Chip } from '@mui/material';
import { Delete as DeleteIcon, Devices as DevicesIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useGetSessions, useDeleteSession } from '@/src/app/hooks/UseUser';
import { useUser } from '@/src/app/Context/UserContext';
import { Sessions } from '@/src/app/models/Sessions';

export default function SessionsPage() {
  const { user } = useUser();
  const { data: sessionsData = [], isLoading } = useGetSessions(Number(user?.id) || 0);
  const { mutate: deleteSession } = useDeleteSession();

  const [sessions, setSessions] = useState<Sessions[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  useEffect(() => {
    if (sessionsData) {
      setSessions(
        sessionsData.map((session: Sessions) => ({
          id: session.id,
          deviceName: 'Sesión iniciada',
          lastActive: session.last_used_at ? formatDate(session.last_used_at) : 'No disponible',
          token: session.token,
        }))
      );
    }
  }, [sessionsData]);

  useEffect(() => {
    if (user?.apiToken) {
      setCurrentToken(user.apiToken);
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
  };

  const handleDeleteSession = (token: string) => {
    if (!user?.id) return;

    Swal.fire({
      title: '¿Cerrar esta sesión?',
      text: "Esta acción cerrará la sesión de este dispositivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSession(
          { id: user.id, token },
          {
            onSuccess: () => {
              setSessions((prev) => prev.filter((session) => session.token !== token));
              Swal.fire('¡Cerrada!', 'La sesión ha sido cerrada.', 'success');
            },
            onError: () => {
              Swal.fire('Error', 'No se pudo cerrar la sesión.', 'error');
            },
          }
        );
      }
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Sesiones Activas
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <>
          {sessions.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="body1" color="text.secondary">
                No hay sesiones activas.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                maxHeight: { xs: '60vh', md: '70vh' },
                overflowY: 'auto',
                pr: 1,
              }}
            >
              <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                {sessions.map((session) => (
                  <Box
                    key={session.token}
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
                      display: 'flex',
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 3,
                        width: '100%',
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <DevicesIcon sx={{ fontSize: 40 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {session.deviceName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Última actividad: {session.lastActive}
                          </Typography>
                          {session.token === currentToken && (
                            <Chip label="Esta sesión" color="success" size="small" sx={{ mt: 1 }} />
                          )}
                        </Box>
                      </Box>

                      <IconButton
                        color="error"
                        onClick={() => session.token && handleDeleteSession(session.token)}
                        disabled={session.token === currentToken}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
