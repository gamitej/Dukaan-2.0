import dayjs from "dayjs";
import { useGlobleStore } from "@/store/globalStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function BasicDateRangePicker({
  size = "medium",
}: {
  size?: "medium" | "small";
}) {
  const { selectedDateRange, setSelectedDateRange } = useGlobleStore();

  const handleEndDateChange = (newDate: dayjs.Dayjs | any, label: string) => {
    setSelectedDateRange(label, dayjs(newDate).format("YYYY-MM-DD"));
  };

  /**
   * TSX
   */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <form className="w-fit bg-white flex gap-2 p-4 shadow-md rounded-md">
          <DatePicker
            format="DD-MMM-YY"
            label="Start Date"
            slotProps={{ textField: { size } }}
            maxDate={dayjs(selectedDateRange.endDate)}
            value={dayjs(selectedDateRange.startDate)}
            onChange={(newValue) => handleEndDateChange(newValue, "startDate")}
          />
          <DatePicker
            label="End Date"
            maxDate={dayjs()}
            format="DD-MMM-YY"
            slotProps={{ textField: { size } }}
            value={dayjs(selectedDateRange.endDate)}
            minDate={dayjs(selectedDateRange.startDate)}
            onChange={(newValue) => handleEndDateChange(newValue, "endDate")}
          />
        </form>
      </DemoContainer>
    </LocalizationProvider>
  );
}
