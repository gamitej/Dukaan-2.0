import StockCard from "./(components)/StockCard";

const Stocks = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="text-white text-2xl">Stock Overview</div>
      </div>
      <StockCard />
    </div>
  );
};

export default Stocks;
