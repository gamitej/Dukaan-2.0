import { useQuery } from "@tanstack/react-query";
import BasicModal from "../model/BasicModel";
// store
import { useGlobleStore } from "@/store/globalStore";
// services
import { getAllStocksData } from "@/services/stocks";
import StockCard from "../cards/StockCard";

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
        modalHeight="80vh"
        modalWidth="50vw"
        title="Stocks Overview"
        isOpen={isStockModelOpen}
        onClose={setIsStockModelOpen}
      >
        <StockCard stocksData={stocksData} />
      </BasicModal>
    </div>
  );
};

export default Stocks;
