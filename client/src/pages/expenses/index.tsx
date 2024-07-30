import ExpenseTable from "./components/ExpenseTable";
import BasicDateRangePicker from "@/components/fields/DateRangePicker";

const Expense = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-lightDark py-4 px-6 rounded-md">
        <div className="text-white text-2xl">Expense Overview</div>
      </div>

      <div className="mt-4">
        <BasicDateRangePicker />
      </div>
      {/*=========== ALL Expense CARD ===========*/}
      <div className="mt-8">
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Expense;
