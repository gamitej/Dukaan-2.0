import * as React from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

type TabData = { value: string; label: string; content: React.ReactNode };

interface BasicTabProps {
  tabData: TabData[];
}

export default function BasicTab({ tabData = [] }: BasicTabProps) {
  const [value, setValue] = React.useState(() => {
    if (tabData.length > 0) return tabData[0].value;

    return "";
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  /**
   * TSX
   */
  return (
    <div className="bg-white rounded-md shadow-md border">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {tabData.map((item) => (
            <Tab label={item?.label} value={item?.value} />
          ))}
        </TabList>
        {tabData.map((item) => (
          <TabPanel value={item?.label}>{item?.content}</TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
