import { FC } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface CommonTableProps {
  rows: any[];
  isLoading?: boolean;
  topToolbarComp?: React.ReactNode;
  columns: MRT_ColumnDef<any[]> | any;
}

const CommonTable: FC<CommonTableProps> = ({
  columns = [],
  rows = [],
  topToolbarComp,
  isLoading = false,
}) => {
  // const columns = useMemo<MRT_ColumnDef<Person>[]>(

  const table = useMaterialReactTable({
    columns,
    data: rows,
    state: { isLoading },
    renderTopToolbarCustomActions: () => {
      return topToolbarComp;
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: { border: "0.15px solid gray" },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default CommonTable;
