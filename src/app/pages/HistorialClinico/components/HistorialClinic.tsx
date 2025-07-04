'use client';

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetUser } from "@/src/app/hooks/UseUser";
import { useGet, useCreateHistorial } from "@/src/app/hooks/historial";
import HistorialCard from "@/src/app/pages/HistorialClinico/components/HistorialCard";
import UpdateHistorialModal from "@/src/app/pages/HistorialClinico/components/UpdatedHistorialModal";
import { User } from "@/src/app/models/user";
import { useUser } from "@/src/app/Context/UserContext";

interface Historial {
  id: number;
  paciente_id: number;
  [key: string]: null | string | number | boolean;
}

interface Props {
  patientId?: number;
}

export default function HistorialesPorPaciente({ patientId }: Props) {
  const { data: usersData } = useGetUser();
  const users = usersData as User[];
  const { data: historiales } = useGet();
  const { mutate: createHistorial } = useCreateHistorial();

  const [historialesPorPaciente, setHistorialesPorPaciente] = useState<Record<number, Historial[]>>({});
  const [openModal, setOpenModal] = useState(false);
  const [historialActual, setHistorialActual] = useState<number | null>(null);
  const { user } = useUser(); // <-- usuario logueado

  useEffect(() => {
    if (!users || !historiales) return;

    // 👉 Filtrado dinámico según el rol
    const pacientesFiltrados = users.filter((u) =>
      user?.role === "patient"
        ? Number(u.id) === Number(user.id) // solo su propio registro
        : u.role === "patient"             // todos los pacientes si no es "patient"
    );

    console.log("Pacientes filtrados:", pacientesFiltrados);
    console.log("Historiales:", historiales);

    const agrupados: Record<number, Historial[]> = {};
    pacientesFiltrados.forEach((paciente) => {
      if (typeof paciente.id === "number") {
        agrupados[paciente.id] = historiales
          .filter((historial) => (historial.paciente_id ?? 0) === paciente.id)
          .map((historial) => ({
            ...historial,
            paciente_id: Number(historial.paciente_id),
            id: Number(historial.id),
          }));
      }
    });

    setHistorialesPorPaciente(agrupados);
  }, [users, historiales, patientId, user?.role, user?.id]);

  const handleOpenModal = (pacienteId: number) => {
    setHistorialActual(pacienteId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" className="py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Typography variant="h4" className="text-center font-bold mb-8">
          Historiales Clínicos por Paciente
        </Typography>

        {users
          ?.filter((u) =>
            user?.role === "patient"
              ? Number(u.id) === Number(user.id)
              : u.role === "patient"
          )
          .map((paciente) => (
            <Accordion
              key={paciente.id}
              sx={{
                backgroundColor: "#f1f5f9",
                borderRadius: 2,
                mb: 2,
                boxShadow: 2,
                border: "1px solid #cbd5e1"
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#e2e8f0", borderRadius: 2 }}>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  {paciente.name ?? "Paciente sin nombre"} (ID: {paciente.id})
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}>
                {paciente.id !== undefined && historialesPorPaciente[Number(paciente.id)]?.length > 0 ? (
                  historialesPorPaciente[Number(paciente.id)]?.map((historial, idx) => (
                    <HistorialCard
                      key={idx}
                      historial={{
                        ...historial,
                        id: String(historial.id),
                        paciente_id: String(historial.paciente_id)
                      }}
                      onActualizar={() => handleOpenModal(Number(paciente.id))}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No hay historiales registrados para este paciente.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}

        <UpdateHistorialModal
          open={openModal}
          onClose={handleCloseModal}
          pacienteId={historialActual ?? 0}
          createHistorial={createHistorial}
        />
      </div>
    </Container>
  );
}
