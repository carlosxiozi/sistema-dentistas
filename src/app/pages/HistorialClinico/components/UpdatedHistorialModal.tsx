import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

interface UpdateHistorialModalProps {
  open: boolean;
  onClose: () => void;
  pacienteId: number;
  createHistorial: (data: { [key: string]: string | number }, options: { onSuccess: () => void; onError: () => void }) => void;
}

export default function UpdateHistorialModal({ open, onClose, pacienteId, createHistorial }: UpdateHistorialModalProps) {
  const [formulario, setFormulario] = useState({
    fechaConsulta: "",
    motivoConsulta: "",
    diagnostico: "",
    planTratamiento: "",
    notasAdicionales: "",
    firmaDentista: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = { ...formulario, paciente_id: pacienteId };
    createHistorial(data, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        alert("Error al actualizar historial.");
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "90%", maxWidth: 500, bgcolor: "background.paper", borderRadius: 3, boxShadow: 24, p: 5
      }}>
        <Typography variant="h6" className="mb-6 font-bold text-center text-gray-700">Actualizar Historial</Typography>

        <form className="flex flex-col gap-4">
          <TextField label="Fecha de consulta" name="fechaConsulta" value={formulario.fechaConsulta} onChange={handleChange} fullWidth />
          <TextField label="Motivo de consulta" name="motivoConsulta" value={formulario.motivoConsulta} onChange={handleChange} fullWidth />
          <TextField label="Diagnóstico" name="diagnostico" value={formulario.diagnostico} onChange={handleChange} multiline rows={2} fullWidth />
          <TextField label="Plan de Tratamiento" name="planTratamiento" value={formulario.planTratamiento} onChange={handleChange} multiline rows={2} fullWidth />
          <TextField label="Notas adicionales" name="notasAdicionales" value={formulario.notasAdicionales} onChange={handleChange} multiline rows={2} fullWidth />
          <TextField label="Firma del Dentista (Nombre)" name="firmaDentista" value={formulario.firmaDentista} onChange={handleChange} fullWidth />

          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              borderColor: "#1d4ed8",
              color: "#1d4ed8",
              fontWeight: "bold",
              textTransform: "none"
            }}
          >
            Actualizar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
