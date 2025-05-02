'use client';

import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Role } from '@/src/app/models/role';
import RolModal from "@/src/app/pages/Roles/components/rolModal";
import EditIcon from '@mui/icons-material/Edit';

interface rolTableProps {
  rol: Role[];
  handleDelete: (id: string) => void;
}

const RolTable: React.FC<rolTableProps> = ({ rol, handleDelete }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#d1fae5' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Creado</TableCell>
            <TableCell align="center">Actualizado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rol.length > 0 ? (
            rol.map((rolItem, idx) => (
              <TableRow
                key={rolItem.id}
                sx={{
                  backgroundColor: idx % 2 === 0 ? 'white' : '#f9fafb',
                  '&:hover': {
                    backgroundColor: '#e5e7eb',
                  },
                }}
              >
                <TableCell>{rolItem.id}</TableCell>
                <TableCell>{rolItem.name}</TableCell>
                <TableCell align="center">
                  {rolItem.created_at
                    ? new Date(rolItem.created_at).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell align="center">
                  {rolItem.updated_at
                    ? new Date(rolItem.updated_at).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell align="center">
                <RolModal role={rolItem} isNew={false}>
                  <IconButton color="primary" size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </RolModal>
                  <Tooltip title="Eliminar Rol" arrow>
                    <IconButton
                      onClick={() => handleDelete(String(rolItem.id))}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
                  No se encontraron roles.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolTable;
