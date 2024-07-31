import { useMemo } from "react";
import colorMapping from "@/data/colors.json";
import BarCard from "@/components/cards/BarCard";
import { useQuery } from "@tanstack/react-query";
import { getLastSixMonthOverview } from "@/services/Summary";

// const cate = ["Jan", "Feb", "Mar", "Apr", "May"];

const LastSixMonthOverview = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: chartData = {}, isLoading } = useQuery({
    queryKey: ["monthly-overview"],
    queryFn: () => getLastSixMonthOverview(),
  });

  const series = useMemo(() => {
    return [
      {
        name: "Net Profit",
        data: chartData?.series?.NetProfit || [],
        // data: [1111, 2333, 3232, 4000, 5000, 9000],
      },
      {
        name: "Purchase",
        data: chartData?.series?.Purchase || [],
      },
      {
        name: "Sale",
        data: chartData?.series?.Sale || [],
      },
      {
        name: "Expenses",
        data: chartData?.series?.Expenses || [],
      },
    ];
  }, [chartData]);

  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        series={series}
        yAxisTitle="growth in rupees"
        categories={chartData.cate}
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
