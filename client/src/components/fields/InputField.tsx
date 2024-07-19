import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: "text" | "number";
  placeholder: string;
  value: string | number | null;
  variant?: "outlined" | "filled" | "standard";
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  value = null,
  type = "text",
  label = "label",
  placeholder = "label",
  variant = "outlined",
  handleChange,
}: InputFieldProps) {
  /**
   * TSX
   */
  return (
    <TextField
      type={type}
      value={value}
      label={label}
      variant={variant}
      onChange={handleChange}
      id={`input-field-${id}`}
      placeholder={placeholder}
    />
  );
}

{
  /* <InputField
handleChange={() => {}}
id="add-party"
label="Party"
value={null}
placeholder="Enter party name..."
/> */
}
