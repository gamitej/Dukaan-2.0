import ReturnModel from "./ReturnModel";
import CommonTable from "@/components/table/CommonTable";
// store
import { usePurchaseStore } from "@/store/purchaseStore";

const Return = () => {
  const { setIsModelOpen, setIsChecked } = usePurchaseStore();

  const handleClick = () => {
    setIsModelOpen();
    setIsChecked(true);
  };

  /**
   * TSX
   */
  return (
    <div>
      <ReturnModel />
      <CommonTable
        topToolbarComp={
          <div>
            <button
              onClick={handleClick}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Return
            </button>
          </div>
        }
        rows={[]}
        columns={[]}
      />
    </div>
  );
};

export default Return;
