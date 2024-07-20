import CommonTable from "@/components/table/CommonTable";
import PurchaseModal from "../(components)/PurchaseModal";
// store
import { usePurchaseStore } from "@/store/purchaseStore";

const PurchaseTable = () => {
  const { setIsModelOpen } = usePurchaseStore();

  /**
   * TSX
   */
  return (
    <div>
      <PurchaseModal />
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
