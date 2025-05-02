import { useState, FormEvent } from "react";
import { User } from "@/src/app/models/user";
import { useCreateUser, useUpdateUser } from "@/src/app/hooks/UseUser";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';

interface FormRoleProps {
  user?: User;
  isNew?: boolean;
  onClose: () => void;
}

export function FormRole({ user, isNew = false, onClose }: FormRoleProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [isActive, setIsActive] = useState(user?.is_active === 1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogIcon, setDialogIcon] = useState<React.ReactNode>(<CheckCircle />); // Default success icon
  const [dialogColor, setDialogColor] = useState("#4CAF50"); // Default success color

  const { mutate: createMutation } = useCreateUser();
  const { mutate: updateMutation } = useUpdateUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: User = {
      id: user?.id ?? "",
      name,
      email,
      password: user?.password ?? password ?? "",
      phone,
      address,
      city,
      state,
      is_active: isActive ? 1 : 0,
      created_at: user?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const onSuccess = () => {
      setDialogMessage(isNew ? "Usuario creado correctamente" : "Usuario actualizado correctamente");
      setDialogIcon(<CheckCircle style={{ color: "#4CAF50", fontSize: 50 }} />);
      setDialogColor("#4CAF50");
      setOpenDialog(true);
    };

    const onError = () => {
      setDialogMessage(isNew ? "Error al crear el usuario" : "Error al actualizar el usuario");
      setDialogIcon(<ErrorOutline style={{ color: "#F44336", fontSize: 50 }} />);
      setDialogColor("#F44336");
      setOpenDialog(true);
    };

    if (isNew) {
      createMutation(data, { onSuccess, onError });
    } else {
      updateMutation(data, { onSuccess, onError });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    onClose();
  };
console.log(user);
  return (
    <form onSubmit={handleSubmit}>
      <Box p={3}>
        <Typography variant="body1" textAlign="center" mb={3}>
          {isNew ? "Crear Usuario" : "Actualizar Usuario"}
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} // 1 columna en móvil, 2 en desktop
          gap={2}
        >
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required={isNew}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            label="Ciudad"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <TextField
            label="Estado"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

     

          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                color="primary"
              />
            }
            label="Activo"
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ padding: "8px 20px" }}
          >
            {isNew ? "Crear" : "Actualizar"}
          </Button>
        </Box>
      </Box>

      {/* Dialog Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4 }}>
          <Box mb={2}>{dialogIcon}</Box>
          <Typography component="span" variant="h6" sx={{ textAlign: "center" }}>
            {dialogMessage}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", padding: "16px 24px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: dialogColor,
              borderRadius: "20px",
              color: "white",
              "&:hover": {
                backgroundColor: dialogColor,
              },
              padding: "8px 24px",
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default FormRole;
