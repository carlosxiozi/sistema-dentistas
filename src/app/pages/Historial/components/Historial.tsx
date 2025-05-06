"use client";

import { useState } from "react";
import { Container, Typography } from "@mui/material";
import FormSection from "@/src/app/pages/Historial/components/formSection";
import FormField from "@/src/app/pages/Historial/components/FormField";
import SaveButton from "@/src/app/pages/Historial/components/SaveButton";
import SuccessSnackbar from "@/src/app/pages/Historial/components/SucessSnackbar";
import { Email, Phone, Person } from "@mui/icons-material";
import { useCreateHistorial } from "@/src/app/hooks/historial";
import { useUser } from "@/src/app/Context/UserContext";
import { useRouter } from "next/navigation";

export default function HistorialClinicoForm() {
  const router = useRouter();
  const [formulario, setFormulario] = useState({
    nombre: "",
    edad: "",
    sexo: "",
    telefono: "",
    correo: "",
    ocupacion: "",
    fechaConsulta: "",
    motivoConsulta: "",
    antecedentesMedicos: "",
    antecedentesDentales: "",
    notasAdicionales: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const { mutate: createHistorial } = useCreateHistorial();
  const { user, loading } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      setError("Cargando usuario, por favor espera...");
      return;
    }

    if (!user?.id) {
      setError("No se pudo obtener el usuario logueado.");
      return;
    }

    const camposObligatorios = [
      "nombre",
      "edad",
      "sexo",
      "telefono",
      "antecedentesMedicos",
    ];

    const camposVacios = camposObligatorios.filter(
      (field) => !formulario[field as keyof typeof formulario]
    );

    if (camposVacios.length > 0) {
      setError("Por favor llena todos los campos obligatorios.");
      return;
    }

    // Mandamos el historial con el pacienteId
    const historialCompleto = {
      ...formulario,
      paciente_id: user.id,
    };

    createHistorial(historialCompleto, {
      onSuccess: () => {
        setExito(true);
        setFormulario({
          nombre: "",
          edad: "",
          sexo: "",
          telefono: "",
          correo: "",
          ocupacion: "",
          fechaConsulta: new Date().toISOString().split("T")[0], // Fecha de hoy
          motivoConsulta: "Paciente nuevo",
          antecedentesMedicos: "",
          antecedentesDentales: "",
          notasAdicionales: "",
        });

        // ✅ AQUI EL DELAY ANTES DE REDIRIGIR
        setTimeout(() => {
          router.push("/pages/Appointments");
        }, 2000); // 2 segundos de espera
      },
      onError: () => {
        setError("Ocurrió un error al guardar el historial. Intenta nuevamente.");
      },
    });
  };

  return (
    <Container maxWidth="sm" className="py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <Typography variant="h4" className="text-center font-bold mb-6">
          Crear Historial Clínico
        </Typography>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Completa el siguiente formulario para crear tu historial clínico.
          <br />
          Todos los campos marcados con * son obligatorios.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Sección: Datos del Paciente */}
          <FormSection title="Datos del Paciente">
            <FormField
              icon={<Person />}
              label="Nombre completo *"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
            />
            <FormField
              label="Edad *"
              name="edad"
              type="number"
              value={formulario.edad}
              onChange={handleChange}
            />
            <FormField
              label="Sexo *"
              name="sexo"
              value={formulario.sexo}
              onChange={handleChange}
            />
            <FormField
              icon={<Phone />}
              label="Teléfono *"
              name="telefono"
              value={formulario.telefono}
              onChange={handleChange}
            />
            <FormField
              icon={<Email />}
              label="Correo electrónico (opcional)"
              name="correo"
              value={formulario.correo}
              onChange={handleChange}
            />
            <FormField
              label="Ocupación (opcional)"
              name="ocupacion"
              value={formulario.ocupacion}
              onChange={handleChange}
            />
          </FormSection>

          {/* Sección: Información de la Consulta */}
          <FormSection title="Información de la Consulta">
            <FormField
              label="Antecedentes médicos *"
              name="antecedentesMedicos"
              value={formulario.antecedentesMedicos}
              onChange={handleChange}
              multiline
              rows={2}
            />
            <FormField
              label="Antecedentes dentales (opcional)"
              name="antecedentesDentales"
              value={formulario.antecedentesDentales}
              onChange={handleChange}
              multiline
              rows={2}
            />
            <FormField
              label="Notas adicionales (opcional)"
              name="notasAdicionales"
              value={formulario.notasAdicionales}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </FormSection>

          <SaveButton />
        </form>

        <SuccessSnackbar
          error={error}
          setError={setError}
          exito={exito}
          setExito={setExito}
        />
      </div>
    </Container>
  );
}
