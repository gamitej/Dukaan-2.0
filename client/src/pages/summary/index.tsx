import Charts from "./(components)/charts";
import SelectTab from "./(components)/SelectTab";
import SummaryCard from "./(components)/SummaryCard";

const Summary = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] m-auto mt-10">
      <div className="text-white text-2xl bg-lightDark py-4 flex justify-center items-center gap-4 shadow-md rounded-md">
        Summary
      </div>
      <SummaryCard />
      <SelectTab />
      <Charts />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Summary;
