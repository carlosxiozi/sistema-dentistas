"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  CircularProgress,
  Fade,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState, useEffect } from 'react';
import { useUser } from '@/src/app/Context/UserContext';
import { useUpdateUser } from '@/src/app/hooks/UseUser';
import { ResultModal } from '@/src/app/pages/Config/components/ResultModal';

export default function SettingsPage() {
  const { user, loading } = useUser();
  const { mutate: updateUser } = useUpdateUser();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    is_active: true,
  });

  const [modal, setModal] = useState({
    open: false,
    type: '' as 'success' | 'error',
    message: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        is_active: true, // Default value since 'is_active' is not part of 'User'
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ ...formData, is_active: formData.is_active ? 1 : 0 }, {
      onSuccess: () => {
        setModal({
          open: true,
          type: 'success',
          message: '¡Tu información ha sido actualizada exitosamente!',
        });
      },
      onError: () => {
        setModal({
          open: true,
          type: 'error',
          message: 'Hubo un error al actualizar la información.',
        });
      },
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Fade in={!loading}>
      <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: '700px', mx: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Configuración de Usuario
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
          <form onSubmit={handleSubmit}>

            {/* Sección Información de Cuenta */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccountCircleIcon />
                  <Typography fontWeight="bold">Información de Cuenta</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    type="email"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Sección Seguridad */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LockIcon />
                  <Typography fontWeight="bold">Seguridad</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Nueva Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    type="password"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Sección Contacto */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon />
                  <Typography fontWeight="bold">Información de Contacto</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Estado"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Botón de Guardar Cambios */}
            <Box textAlign="center" mt={4}>
              <Button
                type="submit"
                size="large"
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, rgb(34, 20, 231) 0%, rgb(96, 5, 243) 100%)',
                  color: 'white',
                  borderRadius: 8,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0px 4px 10px rgba(9, 25, 243, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, rgb(25, 77, 223) 0%, rgb(23, 102, 219) 100%)',
                    boxShadow: '0px 6px 15px rgba(18, 206, 231, 0.6)',
                  },
                }}
              >
                Guardar Cambios
              </Button>
            </Box>

          </form>
        </Paper>

        {/* Modal de resultado */}
        <ResultModal
          open={modal.open}
          onClose={() => setModal({ ...modal, open: false })}
          type={modal.type}
          message={modal.message}
        />
      </Box>
    </Fade>
  );
}
