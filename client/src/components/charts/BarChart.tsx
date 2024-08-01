import { FC } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

export interface BarChartProps {
  series: any[];
  yAxisSetUp: any;
  categories: any[];
  colors?: string[];
  chartHeight?: number;
  yAxisTitle?: string;
  xAxisType?: "datetime" | "category";
}

const BarChart: FC<BarChartProps> = ({
  series = [],
  categories = [],
  chartHeight = 300,
  xAxisType = "category",
  yAxisSetUp = undefined,
  yAxisTitle = "y-axis-title",
  colors = ["#835AF1", "#5E88FC", "#74DBEF", "#FF6363"],
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
      },
    },

    colors,
    dataLabels: {
      enabled: false,
    },
    yaxis: yAxisSetUp
      ? yAxisSetUp
      : {
          title: {
            text: yAxisTitle,
            style: {
              fontSize: "14px",
            },
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0);
            },
            style: {
              fontSize: "12px",
            },
          },
        },
    xaxis: {
      type: xAxisType,
      categories,
      labels: {
        rotate: -90,
        style: {
          fontSize: "14px",
        },
      },
    },
  };

  /**
   * TSX
   */
  return (
    <div>
      <ReactApexChart
        type="bar"
        height={chartHeight}
        series={series}
        options={options}
      />
    </div>
  );
};

export default BarChart;
