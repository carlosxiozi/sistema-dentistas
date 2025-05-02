import { TextField, InputAdornment } from "@mui/material";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

export default function FormField({ label, name, value, onChange, type = "text", multiline = false, rows = 1, icon }: Props) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline}
      rows={rows}
      fullWidth
      InputProps={icon ? { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> } : undefined}
    />
  );
}
