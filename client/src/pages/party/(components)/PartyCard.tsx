import { FiArrowRightCircle } from "react-icons/fi";

const data = [
  { label: "Party Name 1", pendingPayment: "2300" },
  { label: "Party Name 2", pendingPayment: "2300" },
  { label: "Party Name 3", pendingPayment: "2300" },
];

const PartyCard = () => {
  /**
   * TSX
   */
  return (
    <div className="mt-4 grid grid-cols-12 gap-4">
      {data.map(({ label, pendingPayment }) => (
        <div className="col-span-4 bg-mediumDark shadow-md rounded-md py-4 px-6 text-white flex justify-between items-center border-lightDark border-[2px]">
          <div className="flex flex-col gap-3">
            <div className="text-blue-400 text-xl">{label}</div>
            <div className="flex items-center gap-2">
              <div>Pending Payment - </div>
              <div>Rs {pendingPayment}</div>
            </div>
          </div>
          <div>
            <FiArrowRightCircle className="text-blue-400 text-4xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartyCard;
