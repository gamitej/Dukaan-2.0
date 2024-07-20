import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Options = { label: string; value: string | number };

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: Options[];
  isDisabled?: boolean;
  width?: number | string;
  setInputChange: (newValue: string) => void;
}

export default function Dropdown({
  id,
  options = [],
  value,
  width = 300,
  setInputChange,
  label = "label",
  isDisabled = false,
}: DropdownProps) {
  /**
   * TSX
   */
  return (
    <div>
      <Autocomplete
        id={id}
        inputValue={value}
        disabled={isDisabled}
        onInputChange={(_event, newInputValue) => {
          setInputChange(newInputValue);
        }}
        sx={{ width }}
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}

{
  /* <Dropdown
options={options}
id="pary"
value={null}
label="party"
setInputChange={() => {}}
/> */
}
