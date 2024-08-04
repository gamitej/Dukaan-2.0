import _ from "lodash";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import TotalCard from "../common/TotalCard";
import BarCard from "@/components/cards/BarCard";
import BasicTable from "@/components/table/BasicTable";
// store
import { useGlobleStore } from "@/store/globalStore";
import { getPartyCategoriesPurchaseChartData } from "@/services/Purchase";
import { purchaseOverviewCols } from "../data";
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

  const sortedTableData = _.sortBy(chartData, "category");

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

      <BasicTable
        rows={sortedTableData || []}
        cols={purchaseOverviewCols}
        height="35rem"
      />
    </div>
  );
};

export default PartyOverview;
