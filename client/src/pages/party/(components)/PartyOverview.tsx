import { useGlobleStore } from "@/store/globalStore";
import TotalCard from "../common/TotalCard";
import { useQuery } from "@tanstack/react-query";
import { getPartyCategoriesPurchaseChartData } from "@/services/Purchase";

const PartyOverview = ({ partyId = "" }: { partyId: string }) => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch party purchase data
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["party-purchase-chart-data", partyId, selectedDateRange],
    queryFn: () =>
      getPartyCategoriesPurchaseChartData(partyId, selectedDateRange),
  });

  console.log({ chartData });

  /**
   * TSX
   */
  return (
    <div>
      <TotalCard />
      <div></div>
    </div>
  );
};

export default PartyOverview;
