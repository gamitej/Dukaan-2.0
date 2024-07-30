import { FC } from "react";
import BarChart, { BarChartProps } from "../charts/BarChart";

interface BarCardProps extends BarChartProps {
  title: string;
}

const BarCard: FC<BarCardProps> = ({ title = "title", ...res }) => {
  /**
   * TSX
   */
  return (
    <div className="bg-white py-2 shadow-md rounded-md">
      <div className="px-10 py-2 pt-4">
        <p className="text-2xl font-semibold text-lightDark">{title}</p>
      </div>
      <div className="px-4">
        <BarChart {...res} />
      </div>
    </div>
  );
};

export default BarCard;
