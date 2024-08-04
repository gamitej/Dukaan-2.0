import { useQuery } from "@tanstack/react-query";
import { getSalesOverview } from "@/services/Sales";
import { useGlobleStore } from "@/store/globalStore";

const SalesOverview = () => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch sales overview data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["sales-overview-chart-data", selectedDateRange],
    queryFn: () => getSalesOverview(selectedDateRange),
  });

  console.log({ chartData });

  // const {
  //   category = [],
  //   series = [],
  //   yAxisSetUp = [],
  // } = useMemo(() => {
  //   return formattPurchaseChartData(chartData);
  // }, [chartData]);

  /**|
   * TSX
   */
  return <div>SalesOverview</div>;
};

export default SalesOverview;
