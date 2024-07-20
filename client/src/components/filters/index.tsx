import BasicModal from "../model/BasicModel";
import BasicTab from "../common/BasicTab";
import { useGlobleStore } from "@/store/globalStore";

const Filters = () => {
  const { isModelOpen, setIsModelOpen } = useGlobleStore();

  /**
   * TSX
   */
  return (
    <BasicModal isOpen={isModelOpen} onClose={setIsModelOpen} title="">
      <BasicTab
        tabData={[
          { label: "Add Product", value: "add product", content: "hi" },
          { label: "Add Company", value: "add company", content: "hi" },
        ]}
      ></BasicTab>
    </BasicModal>
  );
};

export default Filters;
