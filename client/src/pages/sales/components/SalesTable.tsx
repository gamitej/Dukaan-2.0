import SalesModel from "./SalesModel";
import CommonTable from "@/components/table/CommonTable";
// store
import { usePurchaseStore } from "@/store/purchaseStore";

const SalesTable = () => {
  const { setIsModelOpen } = usePurchaseStore();

  /**
   * TSX
   */
  return (
    <div>
      <SalesModel />
      <CommonTable
        topToolbarComp={
          <div>
            <button
              onClick={setIsModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Sale
            </button>
          </div>
        }
        rows={[]}
        columns={[]}
      />
    </div>
  );
};

export default SalesTable;
