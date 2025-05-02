'use client';

import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '@/src/app/models/user';
import ModalDialog from '@/src/app/components/Modal';

interface UserTableProps {
  user: User[];
  handleDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ user, handleDelete }) => {
  return (
    
    <TableContainer component={Paper} elevation={3}>
      <Table size="small" >
        <TableHead sx={{ backgroundColor: '#0bbdfb' }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell align="center"><strong>Rol</strong></TableCell>
            <TableCell align="center"><strong>Creado</strong></TableCell>
            <TableCell align="center"><strong>Actualizado</strong></TableCell>
            <TableCell align="center"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.length > 0 ? (
            user.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">{user.role || 'Sin Rol'}</TableCell>
                <TableCell align="center">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell align="center">
                  {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" size="small">
                    <ModalDialog user={user} isNew={false}>
                      <EditIcon fontSize="small" />
                    </ModalDialog>
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => user.id && handleDelete(user.id.toString())}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary">
                  No se encontraron usuarios.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
