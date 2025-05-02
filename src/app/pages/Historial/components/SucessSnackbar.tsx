import { Snackbar, Alert } from "@mui/material";

interface Props {
  error: string;
  setError: (value: string) => void;
  exito: boolean;
  setExito: (value: boolean) => void;
}

export default function SuccessSnackbar({ error, setError, exito, setExito }: Props) {
  return (
    <>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={exito} autoHideDuration={3000} onClose={() => setExito(false)}>
        <Alert severity="success">Historial clínico guardado exitosamente. ya puede agrendar una cita</Alert>
      </Snackbar>
    </>
  );
}
