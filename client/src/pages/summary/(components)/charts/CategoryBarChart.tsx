import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import BarCard from "@/components/cards/BarCard";
// data
import colorMapping from "@/data/colors.json";
// store & services
import { useGlobleStore } from "@/store/globalStore";
import { getCategoryWiseOverview } from "@/services/Summary";

const CategoryBarChart = () => {
  const { selectedDateRange } = useGlobleStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["category-overview-table", selectedDateRange],
    queryFn: () => getCategoryWiseOverview(selectedDateRange),
  });

  const { category, series } = useMemo(() => {
    const sales: number[] = [];
    const category: string[] = [];
    const purchase: number[] = [];

    chartData.forEach((item: any) => {
      sales.push(item.totalSold);
      category.push(item?.category);
      purchase.push(item.totalPurchase);
    });

    const series = [
      { name: "Purchase", data: purchase },
      { name: "Sale", data: sales },
    ];

    return { category, series };
  }, [chartData]);

  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        series={series}
        chartHeight={400}
        isLoading={isLoading}
        yAxisTitle="In rupees"
        categories={category}
        title="Category wise sale"
        isError={category?.length == 0}
        colors={[colorMapping.purchase, colorMapping.sale]}
      />
    </div>
  );
};

export default CategoryBarChart;
