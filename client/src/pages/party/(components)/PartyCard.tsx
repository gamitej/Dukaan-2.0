import ItemCard from "@/components/cards/ItemCard";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Party Name 1", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 2", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 3", value: "Rs 2300", label: "Pending Payment -" },
];

const PartyCard = () => {
  const navigate = useNavigate();

  /**
   * TSX
   */
  return (
    <div>
      <ItemCard
        data={data}
        handleClick={(item) => navigate(`/party/${item.name}`)}
      />
    </div>
  );
};

export default PartyCard;
