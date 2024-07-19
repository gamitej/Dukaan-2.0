import ItemCard from "@/components/cards/ItemCard";
import { getAllPartiesDataApi } from "@/services/Party";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Party Name 1", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 2", value: "Rs 2300", label: "Pending Payment -" },
  { name: "Party Name 3", value: "Rs 2300", label: "Pending Payment -" },
];

const PartyCard = () => {
  const navigate = useNavigate();

  // =================== API CALL'S START ======================

  // Query to fetch all party data
  const { data: partiesData = [] } = useQuery({
    queryKey: ["party", "name"],
    queryFn: () => getAllPartiesDataApi(),
  });

  console.log({ partiesData });

  /**
   * TSX
   */
  return (
    <div>
      <ItemCard
        data={partiesData}
        handleClick={(item) => navigate(`/party/${item.name}`)}
      />
    </div>
  );
};

export default PartyCard;
