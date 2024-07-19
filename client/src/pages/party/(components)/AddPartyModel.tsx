import { ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// components
import BasicModal from "@/components/model/BasicModel";
import InputField from "@/components/fields/InputField";
// store
import { usePartyStore } from "@/store/partyStore";
import { getAddPartyNameDataApi } from "@/services/Party";

const AddPartyModel = () => {
  const queryClient = useQueryClient();

  const { setReset, isModelOpen, submitBtnEnable, partyName, setPartyName } =
    usePartyStore();

  // =================== API CALL'S START ======================

  // Mutation to add party name
  const { mutate: mutateAddPartNameData } = useMutation({
    mutationFn: getAddPartyNameDataApi,
    onSuccess: () => {
      setReset();
      // toast.success("Sales data added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["party", "add-name"],
      });
      // setIsSalesAddApiLoading(false);
    },
    onError: (err: any) => {
      const { message } = err.response.data;
      // setIsSalesAddApiLoading(false);
      // toast.error(message || "Error while adding sales data", {
      //   duration: 1200,
      // });
    },
  });

  // ===================== EVENT_HANDLER ======================

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPartyName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setReset();
    mutateAddPartNameData({ name: partyName });
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
