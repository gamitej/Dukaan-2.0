import SelectTab from "./(components)/SelectTab";
import SummaryCard from "./(components)/SummaryCard";

const Summary = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] m-auto mt-10">
      <div className="text-white text-2xl bg-lightDark py-4 flex justify-center items-center gap-4">
        Summary
      </div>
      <SummaryCard />
      <SelectTab />
    </div>
  );
};

export default Summary;
