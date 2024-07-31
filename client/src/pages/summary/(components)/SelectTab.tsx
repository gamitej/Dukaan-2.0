import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SelectTabProps {
  view: "table" | "chart";
  setView: (val: "table" | "chart") => void;
}

export default function SelectTab({ setView, view }: SelectTabProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: "table" | "chart"
  ) => {
    setView(newAlignment);
  };

  return (
    <div className="w-full flex justify-center items-center mt-6 mb-6">
      <ToggleButtonGroup
        exclusive
        color="primary"
        value={view}
        aria-label="Platform"
        onChange={handleChange}
        sx={{ backgroundColor: "whitesmoke", boxShadow: 2 }}
      >
        <ToggleButton value="chart" sx={{ color: "gray", fontWeight: 800 }}>
          Charts View
        </ToggleButton>
        <ToggleButton value="table" sx={{ color: "gray", fontWeight: 800 }}>
          Tabular View
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
