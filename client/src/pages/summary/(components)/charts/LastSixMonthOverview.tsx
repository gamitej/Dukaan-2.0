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

  const isAllDataZero = useMemo(() => {
    return series.every((s) => s.data.every((point: number) => point === 0));
  }, [series]);

  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        series={series}
        chartHeight={500}
        isLoading={isLoading}
        categories={chartData?.cate}
        yAxisTitle="growth in rupees"
        title="Last 6 month overview"
        isError={isAllDataZero || chartData?.cate?.length == 0}
        colors={[
          colorMapping.profit,
          colorMapping.purchase,
          colorMapping.sale,
          colorMapping.expense,
        ]}
      />
    </div>
  );
};

export default LastSixMonthOverview;
