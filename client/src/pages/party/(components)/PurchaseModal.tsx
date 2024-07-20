import BasicModal from "@/components/model/BasicModel";
import { usePartyDetailsStore } from "@/store/partyDetailsStore";

const PurchaseModal = () => {
  const { isModelOpen, setIsModelOpen } = usePartyDetailsStore();

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        title="Add Purchase Record"
        isOpen={isModelOpen}
        onClose={setIsModelOpen}
      >
        hi
      </BasicModal>
    </div>
  );
};

export default PurchaseModal;
