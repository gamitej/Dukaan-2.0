import { useParams } from "react-router-dom";
import { usePartyPendingPayment } from "@/hooks/usePartyPendingPayment";

const TotalCard = () => {
  const { id: partyId = "" } = useParams();

  const { totalPendingPayment, totalPurchase, isLoading } =
    usePartyPendingPayment({
      partyId,
    });

  /**
   * TSX
   */
  return (
    <div className="flex gap-3 items-center bg-white px-4 py-2 border-2 border-zinc-400 rounded-md text-xl text-mediumDark">
      <div className="border-r-2 border-zinc-400 pr-4">
        Total Purchase : {isLoading ? "....." : `Rs ${totalPurchase}`}
      </div>
      <div>
        Pending Payment : {isLoading ? "....." : `Rs ${totalPendingPayment}`}
      </div>
    </div>
  );
};

export default TotalCard;
