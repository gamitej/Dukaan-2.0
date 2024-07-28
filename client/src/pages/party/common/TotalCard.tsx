import { useParams } from "react-router-dom";
import { usePartyPendingPayment } from "@/hooks/usePartyPendingPayment";

const TotalCard = () => {
  const { id: partyId } = useParams();

  if (!partyId) return null;

  const { totalPendingPayment, totalPurchase } = usePartyPendingPayment({
    partyId,
  });

  /**
   * TSX
   */
  return (
    <div className="flex gap-3 items-center bg-white px-4 py-2 border">
      <div>Total Purchase : Rs{totalPurchase}</div>
      <div>Pending Payment : Rs {totalPendingPayment}</div>
    </div>
  );
};

export default TotalCard;
