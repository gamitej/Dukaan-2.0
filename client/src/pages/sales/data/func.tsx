export const formattSalesChartData = (chartData: any) => {
  const avg: number[] = [];
  const quantity: number[] = [];
  const purchase: number[] = [];

  const category: string[] = [];

  chartData.forEach((item: any) => {
    category.push(`${item?.company}-${item?.product}`);
    quantity.push(item?.total_quantity);
    purchase.push(item?.total_sales);
    avg.push(parseInt(item?.avg_sale));
  });

  const series = [
    { name: "Sales", data: purchase, yAxis: 0 },
    { name: "Quantity", data: quantity, yAxis: 1 },
  ];

  const yAxisSetUp = [
    {
      title: {
        text: "Sales / Avg",
        style: {
          fontSize: "14px",
        },
      },
    },
    {
      opposite: true,
      title: {
        text: "Quantity",
        style: {
          fontSize: "14px",
        },
      },
      min: 0,
      max: Math.max(...quantity) * 1.2,
      tickInterval: Math.max(...quantity) / 5,
    },
  ];

  return { category, series, yAxisSetUp };
};
