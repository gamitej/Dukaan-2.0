import colors from "@/data/colors.json";

const data = [
  { label: "Income", value: "1000" },
  { label: "Sales", value: "1000" },
  { label: "Purchase", value: "1000" },
  { label: "Expenses", value: "1000" },
];

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
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {data.map(({ label, value }, idx) => (
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
