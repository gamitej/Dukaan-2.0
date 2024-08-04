import { FC } from "react";

interface BasicTableProps {
  cols?: any[];
  rows: any[];
  height?: string;
  enableIsSold?: boolean;
}

const BasicTable: FC<BasicTableProps> = ({
  cols = [],
  rows = [],
  height = "25rem",
  enableIsSold,
}) => {
  /**
   * TSX
   */
  return (
    <div
      className="w-full overflow-y-auto h-[100%] bg-white shadow-md border rounded-md"
      style={{ height: `calc(${height} - 7rem)` }}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-slate-600 dark:bg-gray-700 sticky top-0 ">
          <tr>
            {cols.map((col, i) => (
              <th
                key={`normal-cols-${i}`}
                scope="col"
                className="px-6 py-3 text-start text-md font-medium text-white uppercase dark:text-gray-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-200 dark:divide-slate-800">
          {rows.map((rowValue, rowIdx) => (
            <tr key={`normal-row-${rowIdx} `}>
              {cols.map((col, idx) => (
                <td
                  key={`normal-cell-${rowIdx}-${idx}`}
                  className={`px-6 py-3 whitespace-nowrap text-md font-medium text-gray-800 dark:text-gray-200 capitalize ${
                    rowIdx === 0 ? "" : ""
                  } ${
                    enableIsSold
                      ? rowValue?.isSold
                        ? "bg-green-300"
                        : "bg-red-300"
                      : ""
                  }`}
                >
                  {rowValue[col.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
