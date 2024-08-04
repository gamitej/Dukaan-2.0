import { useParams } from "react-router-dom";
import { usePartyPendingPayment } from "@/hooks/usePartyPendingPayment";

const TotalCard = () => {
  const { id: partyId = "" } = useParams();

  const { totalPendingPayment, totalPurchase } = usePartyPendingPayment({
    partyId,
  });

  /**
   * TSX
   */
  return (
    <div className="w-fit flex gap-3 items-center bg-white py-2 rounded-md text-xl ">
      <div className="w-fit flex items-center gap-2 border-2 border-slate-400 rounded-md p-2 border-r-2">
        <p className="text-xl font-[550] text-indigo-500">Total Purchase - </p>
        <p className="text-xl font-[550] text-lightDark">Rs {totalPurchase}</p>
      </div>
      <div className="w-fit flex items-center gap-2 border-2 border-slate-400 rounded-md p-2">
        <p className="text-xl font-[550] text-indigo-500">Pending Payment - </p>
        <p className="text-xl font-[550] text-lightDark">
          Rs {totalPendingPayment}
        </p>
      </div>
    </div>
  );
};

export default TotalCard;
