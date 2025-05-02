import { Historial } from "@/src/app/models/historial";
import { Box, Typography, Button } from "@mui/material";

interface HistorialCardProps {
  historial: Historial;
  onActualizar: () => void;
}

export default function HistorialCard({ historial, onActualizar }: HistorialCardProps) {
  return (
    <Box className="flex flex-col gap-2 p-4 border rounded-lg bg-gray-50 mb-4 shadow-sm">
      {historial.id && <Typography variant="body2"><strong>ID Historial:</strong> {historial.id}</Typography>}
      {historial.paciente_id && <Typography variant="body2"><strong>Paciente ID:</strong> {historial.paciente_id}</Typography>}
      {historial.nombre && <Typography variant="body2"><strong>Nombre:</strong> {historial.nombre}</Typography>}
      {historial.edad && <Typography variant="body2"><strong>Edad:</strong> {historial.edad}</Typography>}
      {historial.sexo && <Typography variant="body2"><strong>Sexo:</strong> {historial.sexo}</Typography>}
      {historial.telefono && <Typography variant="body2"><strong>Teléfono:</strong> {historial.telefono}</Typography>}
      {historial.correo && <Typography variant="body2"><strong>Correo:</strong> {historial.correo}</Typography>}
      {historial.ocupacion && <Typography variant="body2"><strong>Ocupación:</strong> {historial.ocupacion}</Typography>}
      {historial.fechaConsulta && <Typography variant="body2"><strong>Fecha de consulta:</strong> {historial.fechaConsulta}</Typography>}
      {historial.motivoConsulta && <Typography variant="body2"><strong>Motivo consulta:</strong> {historial.motivoConsulta}</Typography>}
      {historial.antecedentesMedicos && <Typography variant="body2"><strong>Antecedentes médicos:</strong> {historial.antecedentesMedicos}</Typography>}
      {historial.antecedentesDentales && <Typography variant="body2"><strong>Antecedentes dentales:</strong> {historial.antecedentesDentales}</Typography>}
      {historial.diagnostico && <Typography variant="body2" className="text-blue-600"><strong>Diagnóstico:</strong> {historial.diagnostico}</Typography>}
      {historial.planTratamiento && <Typography variant="body2" className="text-green-600"><strong>Plan tratamiento:</strong> {historial.planTratamiento}</Typography>}
      {historial.notasAdicionales && <Typography variant="body2"><strong>Notas adicionales:</strong> {historial.notasAdicionales}</Typography>}
      {historial.firmaDentista && <Typography variant="body2"><strong>Firma Dentista:</strong> {historial.firmaDentista}</Typography>}

      <Button
        variant="outlined"
        onClick={onActualizar}
        sx={{
          color: "#1d4ed8",
          borderColor: "#1d4ed8",
          textTransform: "none",
          fontWeight: "bold",
          mt: 2,
          width: "fit-content",
          alignSelf: "flex-end"
        }}
      >
        Actualizar Historial
      </Button>
    </Box>
  );
}
