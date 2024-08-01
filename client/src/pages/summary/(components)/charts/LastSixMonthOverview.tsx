import { useMemo } from "react";
import colorMapping from "@/data/colors.json";
import BarCard from "@/components/cards/BarCard";
import { useQuery } from "@tanstack/react-query";
import { getLastSixMonthOverview } from "@/services/Summary";

const LastSixMonthOverview = () => {
  /**
   * ========================= API CALL ===========================
   */

  const { data: chartData = {}, isLoading } = useQuery({
    queryKey: ["monthly-overview"],
    queryFn: () => getLastSixMonthOverview(),
  });

  const series = useMemo(() => {
    return [
      {
        name: "Net Profit",
        data: chartData?.series?.NetProfit || [],
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
        isLoading={isLoading}
        isError={chartData?.cate?.length == 0}
        yAxisTitle="growth in rupees"
        categories={chartData?.cate}
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
