import ExpenseModel from "./ExpenseModel";
import { useExpenseStore } from "@/store/expenseStore";
import CommonTable from "@/components/table/CommonTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseApi, getExpensenDataApi } from "@/services/Expense";
import { useConfirmationStore } from "@/store/confirmationModelStore";
import ConfirmationModel from "@/components/model/ConfirmationModel";
import toast from "react-hot-toast";
import { useGlobleStore } from "@/store/globalStore";

const ExpenseTable = () => {
  const queryClient = useQueryClient();
  const { setIsModelOpen } = useExpenseStore();
  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedData } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  const { selectedDateRange } = useGlobleStore();

  // Query to fetch all options data
  const { data = [], isLoading } = useQuery({
    queryKey: ["expenses-data"],
    queryFn: () => getExpensenDataApi(selectedDateRange),
  });

  // delete purchase data
  const { mutate: mutationDeleteExpenseData } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      setIsConfirmationModelOpen();
      toast.success("Deleted successfully", { duration: 1200 });
      queryClient.invalidateQueries({
        queryKey: ["expenses-data"],
      });
    },
    onError: (err: any) => {
      const message = err?.response?.data;
      toast.error(message || "Something went wrong", {
        duration: 1200,
      });
    },
  });

  /**
   * =========================== EVENT-HANDLER ==========================
   */

  // formatted columns data
  // const formattedCols = useMemo(() => {
  //   return formattedPurchaseTableColumns(commonCols);
  // }, [commonCols]);

  const handleDelete = ({ original }: { original: any }) => {
    const selectedData = { ...original };
    setIsConfirmationModelOpen(selectedData);
  };

  /**
   * TSX
   */
  return (
    <div>
      <ExpenseModel />
      <ConfirmationModel
        message="Are you sure you want to delete ?"
        handleConfirm={() => {
          mutationDeleteExpenseData(selectedData);
        }}
        open={isConfirmationModelOpen}
        handleClose={setIsConfirmationModelOpen}
      />
      <CommonTable
        enableEditing
        enableDelete
        openDeleteConfirmModal={handleDelete}
        isLoading={isLoading}
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
