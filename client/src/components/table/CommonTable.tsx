import {
  MaterialReactTable,
  useMaterialReactTable,
  //   type MRT_ColumnDef,
} from "material-react-table";

const CommonTable = ({ columns = [], rows = [] }) => {
  const table = useMaterialReactTable({
    columns,
    data: rows,
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
