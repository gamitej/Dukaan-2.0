import BasicModal from "../model/BasicModel";
import BasicTab from "../common/BasicTab";
import { useGlobleStore } from "@/store/globalStore";
import AddProduct from "./AddProduct";

const tabsData = [
  {
    label: "Add Product",
    value: "Add Product",
    content: <AddProduct />,
  },
  { label: "Add Company", value: "Add Company", content: "hi" },
];

const Filters = () => {
  const { isModelOpen, setIsModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <BasicModal
      isOpen={isModelOpen}
      onClose={setIsModelOpen}
      title="Add Filter Options"
    >
      <BasicTab tabData={tabsData} />
    </BasicModal>
  );
};

export default Filters;
