import BasicModal from "@/components/model/BasicModel";
import { useExpenseStore } from "@/store/expenseStore";

const ExpenseModel = () => {
  const { isModelOpen, setIsModelOpen } = useExpenseStore();

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
        <form>
            
        </form>
      </BasicModal>
    </div>
  );
};

export default ExpenseModel;
