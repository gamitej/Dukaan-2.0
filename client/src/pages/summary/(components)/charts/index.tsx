import CategoryBarChart from "./CategoryBarChart";
import LastSixMonthOverview from "./LastSixMonthOverview";

const Charts = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <LastSixMonthOverview />
      <CategoryBarChart />
    </div>
  );
};

export default Charts;
