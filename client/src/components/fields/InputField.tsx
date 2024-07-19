import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  id: string;
  type: "text" | "number";
  placeholder: string;
  value: string | number | null;
  variant: "outlined" | "filled" | "standard";
}

export default function InputField({
  id,
  value = null,
  type = "text",
  label = "label",
  placeholder = "label",
  variant = "outlined",
}: InputFieldProps) {
  const handleChange = () => {};

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
