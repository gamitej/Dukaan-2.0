import BasicModal from "@/components/model/BasicModel";
import { usePartyStore } from "@/store/partyStore";

const AddPartyModel = () => {
  const { isModelOpen, setIsModelOpen } = usePartyStore();

  /**
   * TSX
   */
  return (
    <BasicModal title="Add Party" isOpen={isModelOpen} onClose={setIsModelOpen}>
      <div>hi</div>
    </BasicModal>
  );
};

export default AddPartyModel;
