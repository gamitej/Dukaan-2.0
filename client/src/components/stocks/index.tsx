import { useQuery } from "@tanstack/react-query";
import BasicModal from "../model/BasicModel";
// store
import { useGlobleStore } from "@/store/globalStore";
// services
import { getAllStocksData } from "@/services/stocks";

const Stocks = () => {
  const { isStockModelOpen, setIsStockModelOpen } = useGlobleStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: stocksData = [] } = useQuery({
    queryKey: ["stocks", "all-stocks"],
    queryFn: () => getAllStocksData(),
  });

  console.log({ stocksData });

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
