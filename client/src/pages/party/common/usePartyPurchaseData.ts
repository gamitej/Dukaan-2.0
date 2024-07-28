import { useQuery } from "@tanstack/react-query";
import { useGlobleStore } from "@/store/globalStore";
import { getPartyWisePuchaseDataApi } from "@/services/Purchase";

interface usePartyPurchaseDataProps {
  partyId: string;
}

export const usePartyPurchaseData = ({
  partyId = "",
}: usePartyPurchaseDataProps) => {
  const { selectedDateRange } = useGlobleStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data = {}, isLoading } = useQuery({
    queryKey: ["purchase-data", partyId, selectedDateRange],
    queryFn: () => getPartyWisePuchaseDataApi(partyId, selectedDateRange),
  });

  return {
    isLoading,
    purchases: data.purchases,
    totalPurchase: data.totalPrice,
  };
};
