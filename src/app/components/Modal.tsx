"use client";

import { useState } from "react";
import { MdEdit, MdPersonAdd } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { User } from "@/src/app/models/user";
import FormRole from "@/src/app/pages/User/components/form";

interface Props {
  user?: User;
  isNew: boolean;
  children?: React.ReactNode;
}

export default function ModalDialog({ user, isNew, children }: Props) {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultButton = (
    <Button
      onClick={handleOpen}
      variant="contained"
      color={isNew ? "success" : "primary"}
      startIcon={isNew ? <MdPersonAdd /> : <MdEdit />}
      size="small"
      sx={{ textTransform: "none", borderRadius: 2 }}
    >
      {isNew ? "Añadir" : "Editar"}
    </Button>
  );

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        defaultButton
      )}

      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="body1" fontWeight={600}>
            {isNew ? "Agregar Usuario" : "Editar Usuario"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 4, py: 2 }}>
          <FormRole onClose={handleClose} user={user} isNew={isNew} />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
