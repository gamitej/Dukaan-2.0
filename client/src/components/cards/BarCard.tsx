import { FC } from "react";
import BarChart, { BarChartProps } from "../charts/BarChart";
import LoadingSpinner from "../loading/LoadingSpinner";

interface BarCardProps extends BarChartProps {
  title: string;
  isError?: boolean;
  isLoading?: boolean;
  enableBorder?: boolean;
}

const BarCard: FC<BarCardProps> = ({
  // isLoading = false,
  // isError = false,
  title = "title",
  enableBorder = false,
  ...res
}) => {
  /**
   * TSX
   */
  return (
    <div
      className={`bg-white py-2 rounded-md  ${
        enableBorder ? "border-2 border-zinc-400" : "shadow-md"
      }`}
    >
      <div className="px-10 py-2 pt-4">
        <p className="text-2xl font-semibold text-lightDark">{title}</p>
      </div>
      <div className="px-4">
        <ShowBarChart {...res} />
      </div>
    </div>
  );
};

function ShowBarChart(props: any) {
  const { isLoading = false, isError = false } = props;

  if (isLoading) {
    return (
      <div className="h-[15rem] flex justify-center items-center">
        <LoadingSpinner text="" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[15rem] flex justify-center items-center">
        <p className="text-lightDark text-2xl">No data available</p>
      </div>
    );
  }

  return <BarChart {...props} />;
}

export default BarCard;
