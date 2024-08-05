import PurchaseCard from "./components/PurchaseCard";

const Purchase = () => {
  /**
   * JSX
   */
  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-between items-center gap-4 bg-lightDark py-4 px-6 rounded-md">
        <div className="text-white text-2xl">Purchase Overview</div>
      </div>
      {/*=========== ALL PARTIES CARD ===========*/}
      <div className="mt-8">
        <PurchaseCard />
      </div>
    </div>
  );
};

export default Purchase;
