import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface BasicDatePickerProps {
  value: any;
  label?: string;
  setDateChange: (value: any) => void;
}

export default function BasicDatePicker({
  value = null,
  setDateChange,
  label = "Date",
}: BasicDatePickerProps) {
  /**
   * TSX
   */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={value}
          label={label}
          onChange={(newValue) => setDateChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
