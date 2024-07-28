import { useParams } from "react-router-dom";
import { usePartyPurchaseData } from "./usePartyPurchaseData";
import { usePartyPendingPayment } from "@/hooks/usePartyPendingPayment";

const TotalCard = () => {
  const { id: partyId } = useParams();
  if (!partyId) return null;
  const { totalPendingPayment, totalPurchase: total } = usePartyPendingPayment({
    partyId,
  });
  const { totalPurchase } = usePartyPurchaseData({ partyId });

  /**
   * TSX
   */
  return (
    <div className="flex gap-3 items-center">
      <div>
        Total Purchase : Rs {totalPurchase} {total}
      </div>
      <div>Pending Payment : Rs {totalPendingPayment}</div>
    </div>
  );
};

export default TotalCard;
