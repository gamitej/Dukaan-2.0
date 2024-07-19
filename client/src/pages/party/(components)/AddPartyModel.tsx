import BasicModal from "@/components/model/BasicModel";
import InputField from "@/components/fields/InputField";
// store
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
          value={null}
          label="Party"
          id="add-party"
          handleChange={() => {}}
          placeholder="Enter party name..."
        />
      </div>
    </BasicModal>
  );
};

export default AddPartyModel;
