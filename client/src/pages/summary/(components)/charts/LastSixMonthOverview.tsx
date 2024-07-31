import BarCard from "@/components/cards/BarCard";
import colorMapping from "@/data/colors.json";
import { getLastSixMonthOverview } from "@/services/Summary";
import { useQuery } from "@tanstack/react-query";

const series = [
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61],
  },
  {
    name: "Purchase",
    data: [76, 85, 101, 98, 87],
  },
  {
    name: "Sale",
    data: [35, 41, 36, 26, 45],
  },
  {
    name: "Expenses",
    data: [35, 41, 36, 26, 45],
  },
];

const cate = ["Jan", "Feb", "Mar", "Apr", "May"];

const LastSixMonthOverview = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["monthly-overview"],
    queryFn: () => getLastSixMonthOverview(),
  });

  console.log({ chartData });

  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        series={series}
        categories={cate}
        chartHeight={500}
        colors={[
          colorMapping.profit,
          colorMapping.purchase,
          colorMapping.sale,
          colorMapping.expense,
        ]}
        title="Last 6 month overview"
      />
    </div>
  );
};

export default LastSixMonthOverview;
