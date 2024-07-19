import { ChangeEvent, FormEvent } from "react";
// components
import BasicModal from "@/components/model/BasicModel";
import InputField from "@/components/fields/InputField";
// store
import { usePartyStore } from "@/store/partyStore";

const AddPartyModel = () => {
  const {
    setReset,
    isModelOpen,
    setIsModelOpen,
    submitBtnEnable,
    partyName,
    setPartyName,
  } = usePartyStore();

  // ================== EVENT_HANDLER ===================

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPartyName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setReset();
  };

  /**
   * TSX
   */
  return (
    <BasicModal
      title="Add Party"
      modalHeight="20vh"
      modalWidth="40vw"
      isOpen={isModelOpen}
      onClose={setReset}
    >
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-4 mt-4"
      >
        <InputField
          width="40vw"
          label="Party"
          id="add-party"
          value={partyName}
          handleChange={handleInputChange}
          placeholder="Enter party name..."
        />
        <button
          type="submit"
          disabled={!submitBtnEnable}
          className="disabled:bg-slate-300 bg-mediumDark px-4 py-4 shadow-md rounded-sm text-white hover:bg-slate-600"
        >
          Submit
        </button>
      </form>
    </BasicModal>
  );
};

export default AddPartyModel;
