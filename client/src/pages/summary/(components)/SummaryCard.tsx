import colors from "@/data/colors.json";
import { useQuery } from "@tanstack/react-query";
import { getOverallSummayOverview } from "@/services/Summary";
import { useGlobleStore } from "@/store/globalStore";

interface ColorMappingType {
  Sales: string;
  Income: string;
  Purchase: string;
  Expenses: string;
}

const colorMapping: ColorMappingType = {
  Sales: colors.sale,
  Income: colors.profit,
  Purchase: colors.purchase,
  Expenses: colors.expense,
};

const SummaryCard: React.FC = () => {
  const { selectedDateRange } = useGlobleStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: summaryData = [] } = useQuery<
    { label: string; value: string }[]
  >({
    queryKey: ["overall-summary", selectedDateRange],
    queryFn: () => getOverallSummayOverview(selectedDateRange),
  });

  /**
   * TSX
   */
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {summaryData.map(({ label, value }, idx) => (
        <div
          key={idx}
          className="col-span-3 bg-white flex flex-col gap-4 justify-center items-center pb-6 shadow-md rounded-md overflow-hidden"
        >
          <div
            className="w-full text-center py-3 text-xl text-white font-[550] font-poppins"
            style={{
              backgroundColor:
                colorMapping[label as keyof ColorMappingType] || "",
              opacity: 0.8,
            }}
          >
            {label}
          </div>
          <div className="text-2xl text-lightDark font-[550] font-sans">
            Rs {value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
