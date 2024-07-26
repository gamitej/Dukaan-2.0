import { useQuery } from "@tanstack/react-query";
import CommonTable from "../table/CommonTable";
import { getPartyPaymentDataApi } from "@/services/PendingPayment";
import { useMemo } from "react";
import dayjs from "dayjs";
import { paymentCols } from "@/data/CommonTable";

const PaymentTable = ({ partyId = "" }: { partyId: string }) => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party payment data
  const { data: partyPaymentRowsData = [], isLoading } = useQuery({
    queryKey: ["party-payment-data", partyId],
    queryFn: () => getPartyPaymentDataApi(partyId),
  });

  const formattedCols = useMemo(() => {
    if (paymentCols.length === 0) return [];

    return paymentCols?.map(
      ({ header, accessorkey }: { header: string; accessorkey: string }) => {
        return {
          header: header,
          id: accessorkey,
          accessorkey: accessorkey,
          accessorFn: (row: any) => row[accessorkey],
          Cell: ({ row }: { row: any }) => {
            const rowValue = row.original[accessorkey];

            if (accessorkey === "order_id")
              return (
                <p className="max-w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap bg-gray-100 p-2 rounded">
                  {rowValue}
                </p>
              );

            if (accessorkey === "payment") return `Rs ${rowValue}`;

            if (accessorkey === "date") {
              const date = dayjs(rowValue).format("DD-MMM-YYYY");
              return date;
            }

            return rowValue;
          },
        };
      }
    );
  }, [paymentCols]);

  return (
    <div>
      <CommonTable
        enableEditing
        enableViewDetails
        isLoading={isLoading}
        // openDetailsModal={setIsDetailModelOpen}

        columns={formattedCols}
        rows={partyPaymentRowsData || []}
      />
    </div>
  );
};

export default PaymentTable;
