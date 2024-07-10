import ItemCard from "@/components/cards/ItemCard";

const data = [
  { name: "Item Name 1", value: "2300", label: "Avail -" },
  { name: "Item Name 2", value: "2300", label: "Avail -" },
  { name: "Item Name 3", value: "2300", label: "Avail -" },
];

const StockCard = () => {
  /**
   * TSX
   */
  return (
    <div>
      <ItemCard data={data} handleClick={() => console.log()} />
    </div>
  );
};

export default StockCard;
