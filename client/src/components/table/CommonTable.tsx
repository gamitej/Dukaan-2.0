import { FC } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Tooltip } from "@mui/material";
import { MdDelete } from "react-icons/md";

interface CommonTableProps {
  rows: any[];
  isLoading?: boolean;
  enableEditing?: boolean;
  topToolbarComp?: React.ReactNode;
  columns: MRT_ColumnDef<any[]> | any;
  openDeleteConfirmModal?: (row: any) => void;
}

const CommonTable: FC<CommonTableProps> = ({
  rows = [],
  columns = [],
  topToolbarComp,
  isLoading = false,
  enableEditing = false,
  openDeleteConfirmModal,
}) => {
  // const columns = useMemo<MRT_ColumnDef<Person>[]>(

  const table = useMaterialReactTable({
    columns,
    data: rows,
    state: { isLoading },
    enableEditing,
    renderTopToolbarCustomActions: () => {
      return topToolbarComp;
    },
    renderRowActions: ({ row }) => (
      <div className="flex justify-center items-center">
        <Tooltip title="Delete">
          <div
            className="cursor-pointer hover:bg-slate-50 p-3 rounded-full"
            onClick={() =>
              openDeleteConfirmModal ? openDeleteConfirmModal(row) : null
            }
          >
            <MdDelete className="text-red-400 text-2xl" />
          </div>
        </Tooltip>
      </div>
    ),
    muiTablePaperProps: {
      elevation: 0,
      sx: { border: "0.15px solid gray" },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
