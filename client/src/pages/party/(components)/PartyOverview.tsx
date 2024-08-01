import { useGlobleStore } from "@/store/globalStore";
import TotalCard from "../common/TotalCard";
import { useQuery } from "@tanstack/react-query";
import { getPartyCategoriesPurchaseChartData } from "@/services/Purchase";
import BarCard from "@/components/cards/BarCard";
import { useMemo } from "react";
import { formattPurchaseChartData } from "../data/func";

const PartyOverview = ({ partyId = "" }: { partyId: string }) => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch party purchase data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["party-purchase-chart-data", partyId, selectedDateRange],
    queryFn: () =>
      getPartyCategoriesPurchaseChartData(partyId, selectedDateRange),
  });

  const {
    category = [],
    series = [],
    yAxisSetUp = [],
  } = useMemo(() => {
    return formattPurchaseChartData(chartData);
  }, [chartData]);

  console.log({ series });

  /**
   * TSX
   */
  return (
    <div className="w-full flex flex-col gap-4">
      <TotalCard />
      <BarCard
        enableBorder
        chartHeight={350}
        isLoading={isLoading}
        series={series || []}
        yAxisSetUp={yAxisSetUp}
        categories={category || []}
        title="Product wise purchase"
        isError={category?.length === 0}
      />
    </div>
  );
};

export default PartyOverview;
