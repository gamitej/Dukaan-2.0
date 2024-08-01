import { useQuery } from "@tanstack/react-query";
import { useGlobleStore } from "@/store/globalStore";
import { getPartyPendingPaymentDataApi } from "@/services/PendingPayment";

export const usePartyPendingPayment = ({ partyId }: { partyId: string }) => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch party purchase data
  const { data = [], isLoading } = useQuery({
    queryKey: ["pending-payment-data", partyId, selectedDateRange],
    queryFn: () => getPartyPendingPaymentDataApi(partyId, selectedDateRange),
  });

  return {
    isLoading,
    totalPurchase: data.totalPurchase,
    totalPendingPayment: data.totalPendingPayment,
    partyPendingPaymentRowsData: data.pendingPaymentData,
  };
};
