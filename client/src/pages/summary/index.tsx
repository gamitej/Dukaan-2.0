import { useState } from "react";
import Charts from "./(components)/charts";
import SelectTab from "./(components)/SelectTab";
import SummaryCard from "./(components)/SummaryCard";
import TableView from "./(components)/tables";

const Summary = () => {
  const [view, setView] = useState<"chart" | "table">("chart");

  /**
   * TSX
   */
  return (
    <div className="w-[90%] m-auto mt-10">
      <div className="text-white text-2xl bg-lightDark py-4 flex justify-center items-center gap-4 shadow-md rounded-md">
        Summary
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
