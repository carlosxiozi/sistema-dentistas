import { Typography } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <Typography variant="h6" className="text-gray-700 font-semibold">{title}</Typography>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
