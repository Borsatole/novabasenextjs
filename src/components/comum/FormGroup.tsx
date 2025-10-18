import { Label } from "./label";


interface FormGroupProps {
  label?: string;
  id?: string;
  children?: React.ReactNode;
}

export function FormGroup({ label, id, children }: FormGroupProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={id || ""}>{label || ""}</Label>
      <div className="mt-2">{children || ""}</div>
    </div>
  );
}

