"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import {
  Breadcrumbs,
  Typography,
  TextField,
  Box,
  Container,
  Link,
  Stack,
} from '@mui/material';
import ModalDialog from "../components/rolModal";
import { useGetRole, useDeleteRole } from '@/src/app/hooks/useRol';
import Pagination from '@/src/app/components/Pagination';
import RolTable from '../components/rolTable';
import { usePagination } from '@/src/app/hooks/usePagination';
import Loading from '@/src/app/components/Loading';
import { Role } from '@/src/app/models/role';
import { useDarkMode } from '@/src/app/Context/DarkModeContext';

function Users() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { mutate: deleteUser } = useDeleteRole();
  const { data: roles, isLoading, isError } = useGetRole();
  const { currentRows, totalPages } = usePagination<Role>(roles, currentPage, search, 'roles');
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext?.isDarkMode ?? false;
console.log(roles);
  const handleDelete = (userId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(Number(userId), {
          onSuccess: () => {
            router.refresh();
          },
          onError: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          },
        });
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
        </Typography>
      </Box>
    );
  }

  const breadcrumbs = [
    <Link underline="hover" key="2" color="inherit" href="/pages/Dashboard">
      Inicio
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Roles
    </Typography>,
  ];

  return (
    <Container
      maxWidth="lg"
      className={`transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
      sx={{
        borderRadius: 2,
        padding: 2,
        mt: 2,
      }}
    >
      <Box mb={2}>
        <Stack spacing={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: isDarkMode ? 'white' : 'black' }}>
            Gestión de Roles
          </Typography>
          <Typography variant="body2" sx={{ color: isDarkMode ? 'gray.300' : 'gray.700' }}>
            Administra los roles de los usuarios de la aplicación.
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <TextField
            label="Buscar por nombre o email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{
              style: { color: isDarkMode ? '#ccc' : '#333' }
            }}
            InputProps={{
              style: {
                color: isDarkMode ? 'white' : 'black',
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderRadius: 8,
              },
            }}
          />
          <ModalDialog isNew={true} />
        </Box>
      </Box>

      <RolTable rol={currentRows} handleDelete={handleDelete} />
      <Pagination
        totalPages={totalPages}
        initialPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Container>
  );
}

export default Users;
