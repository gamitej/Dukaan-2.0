import { useQuery } from "@tanstack/react-query";
// components
import CommonTable from "@/components/table/CommonTable";
import PurchaseModal from "../(components)/PurchaseModal";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
// services
import { getPartyWisePuchaseDataApi } from "@/services/Purchase";
// data
import { commonCols } from "@/data/CommonTable";
import { useMemo } from "react";
import dayjs from "dayjs";
import CopyCode from "@/components/common/CopyCode";

const PurchaseTable = ({ partyId = "" }: { partyId: string }) => {
  const { setIsModelOpen } = usePurchaseStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPurchaseRowsData = [] } = useQuery({
    queryKey: ["purchase-add-data", partyId],
    queryFn: () => getPartyWisePuchaseDataApi(partyId),
  });

  const formattedCols = useMemo(() => {
    const columns = [
      { header: "Order Id", accessorkey: "order_id" },
      ...commonCols,
    ];

    return columns?.map(({ header, accessorkey }) => {
      return {
        header: header,
        id: accessorkey,
        accessorkey: accessorkey,
        accessorFn: (row: any) => row[accessorkey],
        Cell: ({ row }: { row: any }) => {
          const rowValue = row.original[accessorkey];

          if (accessorkey === "order_id") return <CopyCode code={rowValue} />;

          if (accessorkey === "price") return `Rs ${rowValue}`;

          if (accessorkey === "date")
            return dayjs(rowValue).format("DD-MMM-YYYY");

          return rowValue;
        },
      };
    });
  }, [commonCols]);

  /**
   * TSX
   */
  return (
    <div>
      <PurchaseModal partyId={partyId} />
      <CommonTable
        topToolbarComp={
          <div>
            <button
              onClick={setIsModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Payment
            </button>
          </div>
        }
        columns={formattedCols}
        rows={partyPurchaseRowsData}
      />
    </div>
  );
};

export default PurchaseTable;
