"use client";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button,
  TextField, Pagination, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";
import { usePagination } from "@/src/app/hooks/usePagination"; 
import { useDeletesService, useGetService, useCreateService, useUpdateService } from "@/src/app/hooks/service"; 
import Loading from "@/src/app/components/Loading";
import { ModalFeedback } from "@/src/app/pages/Tratamientos/components/ModalFeedback"; // Tu modal de éxito/error

export default function ServiciosTable() {
  const { data: services = [], isLoading, isError } = useGetService();
  const { mutate: deleteService } = useDeletesService();
  const { mutate: createMutation } = useCreateService();
  const { mutate: updateMutation } = useUpdateService();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { currentRows, totalPages } = usePagination(services, currentPage, search, 'service');

  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [formData, setFormData] = useState({ id: 0, name: "" });

  const [feedback, setFeedback] = useState({ open: false, type: 'success', message: '' });

  const handleOpen = (item?: { id: number; name: string }) => {
    if (item) {
      setIsNew(false);
      setFormData(item);
    } else {
      setIsNew(true);
      setFormData({ id: 0, name: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ open: true, type, message });
  };

  const handleSubmit = () => {
    const dataToSend = { 
      id: 0, 
      name: formData.name, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    };

    const onSuccess = () => {
      showFeedback('success', `Servicio ${isNew ? "creado" : "actualizado"} correctamente`);
      setOpen(false);
    };

    const onError = () => {
      showFeedback('error', "Hubo un problema, intenta de nuevo");
    };

    if (isNew) {
      createMutation(dataToSend, { onSuccess, onError });
    } else {
      updateMutation({ ...dataToSend, id: formData.id }, { onSuccess, onError });
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el servicio permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteService(id, {
          onSuccess: () => {
            Swal.fire("¡Eliminado!", "El servicio ha sido eliminado correctamente.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Hubo un problema al eliminar el servicio.", "error");
          }
        });
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading />;

  if (isError) return <div>Error al cargar los servicios.</div>;

  return (
    <div style={{ padding: "2rem", background: "linear-gradient(to bottom right, #f9fafb, #ffffff)", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>Servicios</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: 3,
            ":hover": { boxShadow: 6 },
          }}
        >
          Añadir Servicio
        </Button>
      </div>

      {/* Search Bar */}
      <TextField
        label="Buscar servicio"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Tabla */}
      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: "1rem" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((servicio) => (
              <TableRow key={servicio.id} hover sx={{ transition: "all 0.3s" }}>
                <TableCell>{servicio.id}</TableCell>
                <TableCell>{servicio.name}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpen(servicio)} sx={{ mr: 1 }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(servicio.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </div>

      {/* Modal Crear/Editar */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isNew ? "Crear Servicio" : "Editar Servicio"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del servicio"
            type="text"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isNew ? "Crear" : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de feedback bonito */}
      <ModalFeedback
        open={feedback.open}
        onClose={() => setFeedback({ ...feedback, open: false })}
        type={feedback.type as 'success' | 'error'}
        message={feedback.message}
      />
    </div>
  );
}
