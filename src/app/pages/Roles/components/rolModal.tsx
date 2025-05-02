'use client';

import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Fade,
  Backdrop
} from '@mui/material';
import { MdEdit, MdPersonAdd } from 'react-icons/md';
import CloseIcon from '@mui/icons-material/Close';

import { Role } from "@/src/app/models/role";
import FormRole from "@/src/app/pages/Roles/components/FormRole";

interface Props {
  role?: Role;
  isNew: boolean;
  children?: React.ReactNode;
}

export default function ModalDialog({ role, isNew }: Props) {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isNew ? (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition"
        >
          <MdPersonAdd className="text-lg" />
          Añadir
        </button>
      ) : (
        <IconButton onClick={handleOpen} sx={{
          color: '#2563eb', // azul similar a tailwind text-blue-600
          '&:hover': {
            color: '#1e40af', // text-blue-800 en hover
          },
        }}
        >
          <MdEdit />
        </IconButton>
      )}

      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={{
              position: 'absolute' as const,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" component="h2" color="text.primary">
                {isNew ? 'Agregar Rol' : 'Editar Rol'}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <FormRole onClose={handleClose} role={role} isNew={isNew} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
