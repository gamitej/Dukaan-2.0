import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

type Options = { label: string; value: string | number };

interface DropdownProps {
  id: string;
  label: string;
  options: Options[];
  value: Options | null;
  width?: number | string;
  setInputChange: (e: React.SyntheticEvent<Element, Event>) => void;
}

export default function Dropdown({
  id,
  options = [],
  value = null,
  width = 300,
  setInputChange,
  label = "label",
}: DropdownProps) {
  /**
   * TSX
   */
  return (
    <div>
      <Autocomplete
        id={id}
        value={value}
        sx={{ width }}
        options={options}
        onInputChange={setInputChange}
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
