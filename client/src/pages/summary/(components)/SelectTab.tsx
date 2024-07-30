import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SelectTab() {
  const [alignment, setAlignment] = React.useState("chart");

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="w-full flex justify-center items-center mt-6 mb-6">
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={alignment}
        aria-label="Platform"
        onChange={handleChange}
        sx={{ backgroundColor: "whitesmoke", border: "2px solid gray" }}
      >
        <ToggleButton value="chart" sx={{ color: "gray", fontWeight: 800 }}>
          Charts View
        </ToggleButton>
        <ToggleButton value="tabular" sx={{ color: "gray", fontWeight: 800 }}>
          Tabular View
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
