const data = [
  { label: "Income", value: "1000" },
  { label: "Sales", value: "1000" },
  { label: "Purchase", value: "1000" },
  { label: "Expenses", value: "1000" },
];

const SummaryCard = () => {
  /**
   * TSX
   */
  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {data.map(({ label, value }, idx) => (
        <div
          key={idx}
          className="col-span-3 bg-indigo-200 flex flex-col gap-4 justify-center items-center pb-6 border-2 border-lightDark shadow-md rounded-sm"
        >
          <div className="w-full bg-orange-200 text-center py-3 text-xl text-lightDark font-[550] font-poppins">
            {label}
          </div>
          <div className="text-2xl text-lightDark font-poppins">Rs {value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
