import InputField from "@/components/fields/InputField";
import BasicModal from "@/components/model/BasicModel";
import { usePartyStore } from "@/store/partyStore";

const AddPartyModel = () => {
  const { isModelOpen, setIsModelOpen } = usePartyStore();

  /**
   * TSX
   */
  return (
    <BasicModal title="Add Party" isOpen={isModelOpen} onClose={setIsModelOpen}>
      <div>
        <InputField
          id="add-party"
          label="Party"
          value={null}
          placeholder="Enter party name..."
        />
      </div>
    </BasicModal>
  );
};

export default AddPartyModel;
