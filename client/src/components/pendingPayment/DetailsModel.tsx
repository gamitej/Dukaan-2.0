import { useQuery } from "@tanstack/react-query";
import BasicModal from "../model/BasicModel";
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";
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
      hi
    </BasicModal>
  );
};

export default DetailsModel;
