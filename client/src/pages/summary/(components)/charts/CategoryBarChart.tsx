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

  const {
    category,
    series,
    isEmpty = false,
  } = useMemo(() => {
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

    const isEmpty =
      sales.length === 0 && category.length === 0 && purchase.length === 0;

    return { category, series, isEmpty };
  }, [chartData]);

  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        series={series}
        chartHeight={350}
        isLoading={isLoading}
        yAxisTitle="In rupees"
        categories={category}
        title="Category wise sale"
        isError={isEmpty || category?.length == 0}
        colors={[colorMapping.purchase, colorMapping.sale]}
      />
    </div>
  );
};

export default CategoryBarChart;
