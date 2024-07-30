import ExpenseModel from "./ExpenseModel";
import { useExpenseStore } from "@/store/expenseStore";
import CommonTable from "@/components/table/CommonTable";

const ExpenseTable = () => {
  const { setIsModelOpen } = useExpenseStore();

  /**
   * TSX
   */
  return (
    <div>
      <ExpenseModel />
      <CommonTable
        enableEditing
        enableDelete
        // openDeleteConfirmModal={handleDelete}
        // isLoading={isLoading}
        topToolbarComp={
          <div>
            <button
              onClick={setIsModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Expense
            </button>
          </div>
        }
        rows={[]}
        columns={[]}
      />
    </div>
  );
};

export default ExpenseTable;
