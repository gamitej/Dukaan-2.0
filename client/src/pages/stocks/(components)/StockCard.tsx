import ItemCard from "@/components/cards/ItemCard";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Item Name 1", value: "2300", label: "Avail -" },
  { name: "Item Name 2", value: "2300", label: "Avail -" },
  { name: "Item Name 3", value: "2300", label: "Avail -" },
];

const StockCard = () => {
  const navigate = useNavigate();

  /**
   * TSX
   */
  return (
    <div>
      <ItemCard
        data={data}
        handleClick={(item) => navigate(`/stocks/${item.name}`)}
      />
    </div>
  );
};

export default StockCard;
