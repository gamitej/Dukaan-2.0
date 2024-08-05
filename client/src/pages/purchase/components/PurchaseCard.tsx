import { useQuery } from "@tanstack/react-query";
import { useGlobleStore } from "@/store/globalStore";
import { getAllPurchaseData } from "@/services/Purchase";
import BasicDateRangePicker from "@/components/fields/DateRangePicker";
import CommonTable from "@/components/table/CommonTable";
import { useMemo } from "react";
import { commonPurchaseCols } from "@/data/CommonTable";
import { formattedPurchaseOverviewTableColumns } from "../data/func";

const PurchaseCard = () => {
  const { selectedDateRange } = useGlobleStore();

  // Query to fetch party purchase data
  const { data: tableRows = [], isLoading } = useQuery({
    queryKey: ["all-purchase-data", selectedDateRange],
    queryFn: () => getAllPurchaseData(selectedDateRange),
  });

  const formattedCols = useMemo(() => {
    return formattedPurchaseOverviewTableColumns(commonPurchaseCols);
  }, []);

  /**
   * TSX
   */
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <BasicDateRangePicker size="small" />
      </div>
      <CommonTable
        columns={formattedCols}
        rows={tableRows}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PurchaseCard;
