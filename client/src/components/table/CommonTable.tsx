import {
  MaterialReactTable,
  useMaterialReactTable,
  //   type MRT_ColumnDef,
} from "material-react-table";
import { FC } from "react";

interface CommonTableProps {
  rows: any;
  columns: any;
  topToolbarComp?: React.ReactNode;
}

const CommonTable: FC<CommonTableProps> = ({
  columns = [],
  rows = [],
  topToolbarComp,
}) => {
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

  /**
   * TSX
   */
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default CommonTable;
