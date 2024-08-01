import { useState } from "react";
import Charts from "./(components)/charts";
import TableView from "./(components)/tables";
import SelectTab from "./(components)/SelectTab";
import SummaryCard from "./(components)/SummaryCard";
import BasicDateRangePicker from "@/components/fields/DateRangePicker";

const Summary = () => {
  const [view, setView] = useState<"chart" | "table">("chart");

  /**
   * TSX
   */
  return (
    <div className="w-[90%] m-auto mt-2">
      <div className="flex justify-end mb-8">
        <BasicDateRangePicker size="small" />
      </div>
      <SummaryCard />
      <SelectTab setView={setView} view={view} />
      <div>{view === "table" ? <TableView /> : <Charts />}</div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Summary;
