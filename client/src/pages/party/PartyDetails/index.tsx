import { useParams } from "react-router-dom";
import BasicTab from "@/components/common/BasicTab";
import CommonTable from "@/components/table/CommonTable";
import PurchaseTable from "./PurchaseTable";

const tabsData = [
  {
    label: "Purchase Record",
    value: "Purchase Record",
    content: <PurchaseTable />,
  },
  {
    label: "Payment Record",
    value: "Payment Record",
    content: <CommonTable rows={[]} columns={[]} />,
  },
  {
    label: "Return Record",
    value: "Return Record",
    content: <CommonTable rows={[]} columns={[]} />,
  },
];

const PartyDetails = () => {
  const { id, name } = useParams();

  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-indigo-400 py-4 px-6 rounded-md">
        <div className="text-white text-2xl capitalize font-[550]">{name}</div>
        <div>
          <button
            // onClick={setIsModelOpen}
            className="bg-rose-500 text-white px-2 py-1 rounded-sm shadow-md text-xl bg-med"
          >
            delete
          </button>
        </div>
      </div>
      <div className="mt-8">
        <BasicTab tabData={tabsData} />
      </div>
    </div>
  );
};

export default PartyDetails;
