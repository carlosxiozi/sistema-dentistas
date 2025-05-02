import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
}

export const ResultModal = ({ open, onClose, type, message }: ResultModalProps) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: 300,
          textAlign: 'center',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        {type === 'success' ? (
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        ) : (
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        )}

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          {type === 'success' ? '¡Éxito!' : '¡Error!'}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};
