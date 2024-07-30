import BarCard from "@/components/cards/BarCard";
import colorMapping from "@/data/colors.json";

console.log(colorMapping);

const cate = ["Wheat", "Pesticide", "Bajra", "Rice"];

const series = [
  { name: "Purchase", data: [50, 12, 20, 40] },
  { name: "Sale", data: [50, 12, 27, 64] },
];

const CategoryBarChart = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full">
      <BarCard
        chartHeight={400}
        series={series}
        categories={cate}
        title="Category wise sale"
        colors={[colorMapping.purchase, colorMapping.sale]}
      />
    </div>
  );
};

export default CategoryBarChart;
