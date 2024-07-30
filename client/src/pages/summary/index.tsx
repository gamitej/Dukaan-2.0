import SummaryCard from "./(components)/SummaryCard";

const Summary = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] m-auto mt-10">
      <div className="text-white text-2xl text-center bg-lightDark py-4">
        Summary
      </div>
      <SummaryCard />
    </div>
  );
};

export default Summary;
