import BasicModal from "../model/BasicModel";
// store
import { useGlobleStore } from "@/store/globalStore";

const Stocks = () => {
  const { isStockModelOpen, setIsStockModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        title="Stocks Overview"
        isOpen={isStockModelOpen}
        onClose={setIsStockModelOpen}
      >
        hi
      </BasicModal>
    </div>
  );
};

export default Stocks;
