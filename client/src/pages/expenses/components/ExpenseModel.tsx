import dayjs from "dayjs";
import { ChangeEvent, FormEvent } from "react";
// components
import Dropdown from "@/components/fields/Dropdown";
import BasicModal from "@/components/model/BasicModel";
import InputField from "@/components/fields/InputField";
import BasicDatePicker from "@/components/fields/BasicDatePicker";
// store
import { useExpenseStore } from "@/store/expenseStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addExpenseApi } from "@/services/Expense";

const dropDownOptions = [
  { label: "Salary", value: "salary" },
  { label: "Auto Fair", value: "Auto-fair" },
  { label: "Paledar", value: "paledar" },
  { label: "Fuel / Petrol", value: "petrol" },
  { label: "Shop Rent", value: "shop rent" },
  { label: "Others", value: "others" },
];

const ExpenseModel = () => {
  const queryClient = useQueryClient();

  const {
    isModelOpen,
    setIsModelOpen,
    formData,
    setFormData,
    setIsFormValid,
    isFormValid,
    setResetFormData,
  } = useExpenseStore();

  // =================== API CALL'S START ======================

  // Mutation to add party name
  const { mutate: mutateAddExpenseData } = useMutation({
    mutationFn: addExpenseApi,
    onSuccess: () => {
      setResetFormData();
      toast.success("Added successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["expenses-data"],
      });
    },
    onError: (err: any) => {
      const message = err.response.data;
      toast.error(message || "Error while adding expense data", {
        duration: 1200,
      });
    },
  });

  // ===================== EVENT_HANDLER ======================

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
    setIsFormValid();
  };

  const handleChangeDropDown = (name: string, value: string) => {
    setFormData(name, value);
    setIsFormValid();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAddExpenseData(formData);
  };

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        modalWidth="45rem"
        isOpen={isModelOpen}
        modalHeight="fitContent"
        onClose={setIsModelOpen}
        title="Add Expenses"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center items-start gap-3">
            <BasicDatePicker
              width="100%"
              value={formData.date}
              setDateChange={(value) =>
                setFormData("date", dayjs(value).format("YYYY-MM-DD"))
              }
            />
            <InputField
              id={"amount"}
              width={"100%"}
              label={"Amount"}
              type={"number"}
              value={formData.amount}
              handleChange={handleInputChange}
              placeholder={"enter amount..."}
            />
          </div>
          <div className="flex justify-center items-start gap-3">
            <InputField
              id={"description"}
              width={"70%"}
              label={"Description"}
              value={formData.description}
              handleChange={handleInputChange}
              placeholder={"enter description..."}
            />
            <Dropdown
              id="category"
              width={"30%"}
              options={dropDownOptions}
              label={"Expense Type"}
              value={formData.category}
              setInputChange={(value: string) => {
                handleChangeDropDown("category", value);
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="disabled:bg-slate-300 bg-mediumDark text-white py-3 rounded-sm shadow-md"
          >
            submit
          </button>
        </form>
      </BasicModal>
    </div>
  );
};

export default ExpenseModel;
