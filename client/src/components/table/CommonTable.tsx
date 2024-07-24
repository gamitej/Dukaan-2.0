import { FC } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

interface CommonTableProps {
  rows: any[];
  columns: MRT_ColumnDef<any[]> | any;
  topToolbarComp?: React.ReactNode;
}

const CommonTable: FC<CommonTableProps> = ({
  columns = [],
  rows = [],
  topToolbarComp,
}) => {
  // const columns = useMemo<MRT_ColumnDef<Person>[]>(

  const table = useMaterialReactTable({
    columns,
    data: rows,
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
