'use client';

import { useState, useEffect } from "react";
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
  Container
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetUser } from "@/src/app/hooks/UseUser";
import { useGet, useCreateHistorial } from "@/src/app/hooks/historial";
import HistorialCard from "@/src/app/pages/HistorialClinico/components/HistorialCard";
import UpdateHistorialModal from "@/src/app/pages/HistorialClinico/components/UpdatedHistorialModal";
import { User } from "@/src/app/models/user";

interface Historial {
  id: number;
  paciente_id: number;
  [key: string]: null | string | number | boolean;
}

export default function HistorialesPorPaciente() {
  // ✅ TIPADO explícito usando tu modelo User
  const { data: usersData } = useGetUser();
  const users = usersData as User[];
  const { data: historiales } = useGet();
  const { mutate: createHistorial } = useCreateHistorial();

  const [historialesPorPaciente, setHistorialesPorPaciente] = useState<Record<number, Historial[]>>({});
  const [openModal, setOpenModal] = useState(false);
  const [historialActual, setHistorialActual] = useState<number | null>(null);

  useEffect(() => {
    if (!users || !historiales) return;

    const pacientes = users?.filter((user) => user.role === "patient");

    const agrupados: Record<number, Historial[]> = {};
    pacientes.forEach((paciente) => {
      if (typeof paciente.id === "number") {
        agrupados[paciente.id] = historiales
          .filter((historial) => (historial.paciente_id ?? 0) === paciente.id)
          .map((historial) => ({
            ...historial,
            paciente_id: Number(historial.paciente_id), // Ensure paciente_id is a number
            id: Number(historial.id), // Ensure id is a number
          }));
      }
    });


    setHistorialesPorPaciente(agrupados);
  }, [users, historiales]);

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

        {users?.filter((user) => user.role === "patient").map((paciente) => (
          <Accordion key={paciente.id} sx={{
            backgroundColor: "#f1f5f9",
            borderRadius: 2,
            mb: 2,
            boxShadow: 2,
            border: "1px solid #cbd5e1"
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#e2e8f0", borderRadius: 2 }}>
              <Typography variant="h6" className="font-semibold text-gray-800">
                {paciente.name ?? "Paciente sin nombre"} (ID: {paciente.id})
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}>
              {paciente.id !== undefined && historialesPorPaciente[Number(paciente.id)]?.length > 0 ? (
                historialesPorPaciente[Number(paciente.id)]?.map((historial, idx) => (
                  <HistorialCard key={idx} historial={{ ...historial, id: String(historial.id), paciente_id: String(historial.paciente_id) }} onActualizar={() => handleOpenModal(Number(paciente.id))} />
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
