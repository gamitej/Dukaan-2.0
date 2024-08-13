import ExpenseModel from "./ExpenseModel";
import { useExpenseStore } from "@/store/expenseStore";
import CommonTable from "@/components/table/CommonTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseApi, getExpensenDataApi } from "@/services/Expense";
import { useConfirmationStore } from "@/store/confirmationModelStore";
import ConfirmationModel from "@/components/model/ConfirmationModel";
import toast from "react-hot-toast";
import { useGlobleStore } from "@/store/globalStore";
import { useMemo } from "react";
import { expenseCols } from "@/data/CommonTable";
import dayjs from "dayjs";

const ExpenseTable = () => {
  const queryClient = useQueryClient();
  const { setIsModelOpen } = useExpenseStore();
  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedData } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  const { selectedDateRange } = useGlobleStore();

  // Query to fetch all expense data
  const { data: expenseRowData = [], isLoading } = useQuery({
    queryKey: ["expenses-data",selectedDateRange],
    queryFn: () => getExpensenDataApi(selectedDateRange),
  });

  // delete expense data
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
  const formattedCols = useMemo(() => {
    return expenseCols?.map(({ header, accessorkey }) => {
      return {
        header: header,
        id: accessorkey,
        accessorkey: accessorkey,
        accessorFn: (row: any) => row[accessorkey],
        Cell: ({ row }: { row: any }) => {
          const rowValue = row.original[accessorkey];

          if (accessorkey === "amount") return `Rs ${rowValue}`;

          if (accessorkey === "date")
            return dayjs(rowValue).format("DD-MMM-YYYY");

          return rowValue;
        },
      };
    });
  }, [expenseCols]);

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
        rows={expenseRowData || []}
        columns={formattedCols || []}
      />
    </div>
  );
};

export default ExpenseTable;
