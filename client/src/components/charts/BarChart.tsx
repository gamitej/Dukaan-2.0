import { FC } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

export interface BarChartProps {
  series: any[];
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
  yAxisTitle = "y-axis-title",
  xAxisType = "category",
  colors = ["#304758", "#F15B46", "#F15B46", "#F15B46"],
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
    yaxis: {
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
