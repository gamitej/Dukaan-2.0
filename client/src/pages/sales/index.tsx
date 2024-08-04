import SalesTable from "./components/SalesTable";
import BasicTab from "@/components/common/BasicTab";
import SalesOverview from "./components/SalesOverview";
import BasicDateRangePicker from "@/components/fields/DateRangePicker";

const tabsData = [
  {
    label: "Overview",
    value: "Overview",
    content: SalesOverview,
  },
  {
    label: "Sales Record",
    value: "Sales Record",
    content: SalesTable,
  },
];

const Sales = () => {
  /**
   * TSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-lightDark py-4 px-6 rounded-md">
        <div className="text-white text-2xl">Sales Overview</div>
      </div>

      <div className="mt-4">
        <BasicDateRangePicker />
      </div>
      {/*=========== ALL SALES CARD ===========*/}
      <div className="mt-8">
        {/* <SalesTable /> */}
        <BasicTab tabData={tabsData} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Sales;
