import CommonTable from "@/components/table/CommonTable";
import PurchaseModal from "../(components)/PurchaseModal";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { useQuery } from "@tanstack/react-query";
import { getPartyWisePuchaseDataApi } from "@/services/Purchase";

const PurchaseTable = ({ partyId = "" }: { partyId: string }) => {
  const { setIsModelOpen } = usePurchaseStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPurchaseData = {} } = useQuery({
    queryKey: ["purchase-add-data", partyId],
    queryFn: () => getPartyWisePuchaseDataApi(partyId),
  });

  console.log({ partyPurchaseData });

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
        rows={[]}
        columns={[]}
      />
    </div>
  );
};

export default PurchaseTable;
