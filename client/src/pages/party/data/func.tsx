import dayjs from "dayjs";
import CopyCode from "@/components/common/CopyCode";

export const formattedPurchaseTableColumns = (commonCols: any) => {
  if (commonCols.length === 0) return [];

  const columns = [
    { header: "Order Id", accessorkey: "order_id" },
    ...commonCols,
    { header: "Avg Price", accessorkey: "avg_price" },
  ];

  return columns?.map(({ header, accessorkey }) => {
    return {
      header: header,
      id: accessorkey,
      accessorkey: accessorkey,
      size: accessorkey === "date" || accessorkey === "quantity" ? 40 : !20,
      accessorFn: (row: any) => row[accessorkey],
      Cell: ({ row }: { row: any }) => {
        const rowValue = row.original[accessorkey];

        if (accessorkey === "order_id") return <CopyCode code={rowValue} />;

        if (accessorkey === "price") return `Rs ${rowValue}`;

        if (accessorkey === "avg_price") return `Rs ${rowValue}`;

        if (accessorkey === "date")
          return dayjs(rowValue).format("DD-MMM-YYYY");

        return rowValue;
      },
    };
  });
};

export const formattedSalesTableColumns = (commonCols: any) => {
  if (commonCols.length === 0) return [];

  const columns = [
    ...commonCols,
    { header: "Avg Price", accessorkey: "avg_price" },
  ];

  return columns?.map(
    ({ header, accessorkey }: { header: string; accessorkey: string }) => {
      return {
        header: header,
        id: accessorkey,
        accessorkey: accessorkey,
        accessorFn: (row: any) => row[accessorkey],
        Cell: ({ row }: { row: any }) => {
          const rowValue = row.original[accessorkey];

          if (accessorkey === "price" || accessorkey === "avg_price")
            return `Rs ${rowValue}`;

          if (accessorkey === "date")
            return dayjs(rowValue).format("DD-MMM-YYYY");

          return rowValue;
        },
      };
    }
  );
};

export const formattPurchaseChartData = (chartData: any) => {
  const avg: number[] = [];
  const quantity: number[] = [];
  const purchase: number[] = [];

  const category: string[] = [];

  chartData.forEach((item: any) => {
    category.push(`${item?.company}-${item?.product}`);
    quantity.push(item?.total_quantity);
    purchase.push(item?.total_purchase);
    avg.push(parseInt(item?.avg_purchase));
  });

  const series = [
    { name: "Purchase", data: purchase, yAxis: 0 },
    { name: "Quantity", data: quantity, yAxis: 1 },
    // { name: "Avg", data: avg, yAxis: 1 },
  ];

  const yAxisSetUp = [
    {
      title: {
        text: "Purchase / Avg",
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
