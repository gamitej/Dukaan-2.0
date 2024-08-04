import _ from "lodash";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import BarCard from "@/components/cards/BarCard";
import BasicTable from "@/components/table/BasicTable";
// services
import { getSalesOverview } from "@/services/Sales";
import { useGlobleStore } from "@/store/globalStore";
// data
import { salesOverviewCols } from "../data";
import { formattSalesChartData } from "../data/func";

const SalesOverview = () => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch sales overview data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["sales-overview-chart-data", selectedDateRange],
    queryFn: () => getSalesOverview(selectedDateRange),
  });

  const {
    category = [],
    series = [],
    yAxisSetUp = [],
  } = useMemo(() => {
    return formattSalesChartData(chartData);
  }, [chartData]);

  const totalSales = useMemo(() => {
    return chartData.reduce(
      (sum: number, item: any) => sum + item.total_sales,
      0
    );
  }, [chartData]);

  const sortedTableData = _.sortBy(chartData, "total_sales");

  /**|
   * TSX
   */
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-fit flex items-center gap-2 border-2 border-slate-400 rounded-md p-2">
        <p className="text-xl font-[550] text-indigo-500">Total Sales - </p>
        <p className="text-xl font-[550] text-lightDark">Rs {totalSales}</p>
      </div>
      <BarCard
        enableBorder
        chartHeight={350}
        isLoading={isLoading}
        series={series || []}
        yAxisSetUp={yAxisSetUp}
        categories={category || []}
        title="Product wise sales"
        isError={category?.length === 0}
      />
      <BasicTable
        height="35rem"
        rows={sortedTableData || []}
        cols={salesOverviewCols}
      />
    </div>
  );
};

export default SalesOverview;
