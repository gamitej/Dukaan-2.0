import { useQuery } from "@tanstack/react-query";
import BarCard from "@/components/cards/BarCard";
import colorMapping from "@/data/colors.json";
import { getCategoryWiseOverview } from "@/services/Summary";
import { useMemo } from "react";

const CategoryBarChart = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["category-overview-table"],
    queryFn: () => getCategoryWiseOverview(),
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
        chartHeight={400}
        series={series}
        categories={category}
        title="Category wise sale"
        colors={[colorMapping.purchase, colorMapping.sale]}
      />
    </div>
  );
};

export default CategoryBarChart;
