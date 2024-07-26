import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import CommonTable from "../table/CommonTable";
// services
import { getPartyPendingPaymentDataApi } from "@/services/PendingPayment";
// data
import { pendingPaymentCols } from "@/data/CommonTable";
import { formattedPendingPaymentTableColumns } from "./func";
import DetailsModel from "./DetailsModel";
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";
import PaymentModel from "./PaymentModel";

const PendingPaymentTable = ({ partyId = "" }: { partyId: string }) => {
  const { setIsDetailModelOpen, setIsPaymentModelOpen } =
    usePendingPaymentStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPendingPaymentRowsData = [], isLoading } = useQuery({
    queryKey: ["pending-payment-data", partyId],
    queryFn: () => getPartyPendingPaymentDataApi(partyId),
  });

  /**
   * =========================== EVENT-HANDLER ==========================
   */

  // formatted columns data
  const formattedCols = useMemo(() => {
    return formattedPendingPaymentTableColumns(pendingPaymentCols);
  }, [pendingPaymentCols]);

  /**
   * TSX
   */
  return (
    <div>
      <DetailsModel />
      <PaymentModel />
      <CommonTable
        enableEditing
        enableViewDetails
        isLoading={isLoading}
        openDetailsModal={setIsDetailModelOpen}
        topToolbarComp={
          <div>
            <button
              onClick={setIsPaymentModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Payment
            </button>
          </div>
        }
        rows={partyPendingPaymentRowsData || []}
        columns={formattedCols}
      />
    </div>
  );
};

export default PendingPaymentTable;
