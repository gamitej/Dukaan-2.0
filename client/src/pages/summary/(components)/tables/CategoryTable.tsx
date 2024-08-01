import BasicTable from "@/components/table/BasicTable";
import { getCategoryWiseOverview } from "@/services/Summary";
import { useGlobleStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";

const cols = [
  { label: "Category", value: "category" },
  { label: "Total Purchase", value: "purchase" },
  { label: "Total Sold", value: "sold" },
  { label: "Quantity ( S / P )", value: "quantity" },
  { label: "Avg Price ( S / P )", value: "avg-price" },
  { label: "Profit", value: "profit" },
];

const rows = [
  {
    category: "Wheat",
    sold: "Rs 12000",
    purchase: "Rs 11000",
    quantity: `50 / 60`,
    "avg-price": `Rs 180 / Rs 160`,
    profit: "Rs 1000",
  },
  {
    category: "Wheat",
    sold: "Rs 12000",
    purchase: "Rs 11000",
    quantity: `50 / 60`,
    "avg-price": `Rs 180 / Rs 160`,
    profit: "Rs 1000",
  },
  {
    category: "Wheat",
    sold: "Rs 12000",
    purchase: "Rs 11000",
    quantity: `50 / 60`,
    "avg-price": `Rs 180 / Rs 160`,
    profit: "Rs 1000",
  },
];

const CategoryTable = () => {
  const { selectedDateRange } = useGlobleStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: tableData = [] } = useQuery({
    queryKey: ["category-overview-table", selectedDateRange],
    queryFn: () => getCategoryWiseOverview(selectedDateRange),
  });

  /**
   * TSX
   */
  return (
    <div>
      <BasicTable cols={cols} rows={tableData || []} />
    </div>
  );
};

export default CategoryTable;
