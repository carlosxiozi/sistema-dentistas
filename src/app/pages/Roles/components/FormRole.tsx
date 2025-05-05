'use client';

import { useState, FormEvent } from "react";
import { Role } from "@/src/app/models/role";
import { useCreateRole, useUpdateRole } from "@/src/app/hooks/useRol";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

interface FormRoleProps {
  role?: Role;
  isNew?: boolean;
  onClose: () => void;
}

export function FormRole({ role, isNew = false, onClose }: FormRoleProps) {
  const [name, setName] = useState(role?.name || "");

  const { mutate: createMutation } = useCreateRole();
  const { mutate: updateMutation } = useUpdateRole();

  const [openModal, setOpenModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const handleModalClose = () => {
    setOpenModal(false);
    if (modalSuccess) {
      onClose();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Role = {
      id: role?.id ? Number(role.id) : 0,
      name,
      created_at: role?.created_at || new Date().toISOString(),
      updated_at: role?.updated_at || new Date().toISOString(),
    };

    const onSuccess = () => {
      setModalSuccess(true);
      setModalMessage(isNew ? "Rol creado correctamente" : "Rol actualizado correctamente");
      setOpenModal(true);
    };

    const onError = () => {
      setModalSuccess(false);
      setModalMessage(isNew ? "Error al crear el rol" : "Error al actualizar el rol");
      setOpenModal(true);
    };

    if (isNew) {
      createMutation(data, { onSuccess, onError });
    } else {
      updateMutation(data, { onSuccess, onError });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={{ xs: 2, md: 3 }} p={{ xs: 1, md: 0 }}>
          <TextField
            label="Nombre del Rol"
            variant="outlined"
            fullWidth
            required
            placeholder="Ej. Administrador, Editor, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box display="flex" justifyContent="flex-end" maxWidth={{ xs: '100%', md: 'auto' }}>
            <Button variant="contained" color="primary" type="submit">
              {isNew ? "Crear Rol" : "Actualizar Rol"}
            </Button>
          </Box>
        </Box>
      </form>

      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            width: { xs: '90%', sm: 360 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: { xs: 3, sm: 4 },
            mx: 'auto',
            mt: { xs: '30%', sm: '15%' },
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <IconButton
            onClick={handleModalClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {modalSuccess ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 1 }} />
          ) : (
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 1 }} />
          )}

          <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
            {modalMessage}
          </Typography>

          <Button
            variant="outlined"
            color={modalSuccess ? "success" : "error"}
            onClick={handleModalClose}
            fullWidth
          >
            Aceptar
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default FormRole;
