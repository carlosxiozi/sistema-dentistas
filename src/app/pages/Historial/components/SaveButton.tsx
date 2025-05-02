import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function SaveButton() {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      startIcon={<SaveIcon />}
      className="py-3"
      sx={{ textTransform: "none", fontWeight: "bold" }}
    >
      Guardar Historial
    </Button>
  );
}
