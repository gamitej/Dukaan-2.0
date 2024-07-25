import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import CommonTable from "../table/CommonTable";
// services
import { getPartyWisePendingPaymentDataApi } from "@/services/PendingPayment";
// data
import { pendingPaymentCols } from "@/data/CommonTable";
import { formattedPendingPaymentTableColumns } from "./func";

const PendingPaymentTable = ({ partyId = "" }: { partyId: string }) => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPendingPaymentRowsData = [], isLoading } = useQuery({
    queryKey: ["pending-payment-data", partyId],
    queryFn: () => getPartyWisePendingPaymentDataApi(partyId),
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
      <CommonTable
        isLoading={isLoading}
        topToolbarComp={
          <div>
            <button
              //   onClick={setIsModelOpen}
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
