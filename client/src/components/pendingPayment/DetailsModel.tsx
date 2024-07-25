import { useQuery } from "@tanstack/react-query";
// components
import BasicModal from "../model/BasicModel";
import LoadingSpinner from "../loading/LoadingSpinner";
// store
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";
// services
import { getPartyPurchaseOrderDetailsDataApi } from "@/services/Purchase";

const DetailsModel = () => {
  const { isDetailModelOpen, setIsDetailModelOpen, selectedData } =
    usePendingPaymentStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase order details data
  const { data: orderDetailsData = [], isLoading } = useQuery({
    queryKey: ["purchase-order-details", selectedData],
    queryFn: () => getPartyPurchaseOrderDetailsDataApi(selectedData),
  });

  console.log({ orderDetailsData });

  /**
   * TSX
   */
  return (
    <BasicModal
      title="Order Details"
      isOpen={isDetailModelOpen}
      onClose={setIsDetailModelOpen}
    >
      {isLoading ? <LoadingSpinner text="" /> : null}
    </BasicModal>
  );
};

export default DetailsModel;
