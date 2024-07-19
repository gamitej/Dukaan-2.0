import ItemCard from "@/components/cards/ItemCard";
import { getAllPartiesDataApi } from "@/services/Party";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PartyCard = () => {
  const navigate = useNavigate();

  // =================== API CALL'S START ======================

  // Query to fetch all party data
  const { data: partiesData = [], isLoading } = useQuery({
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
        isLoading={isLoading}
        handleClick={(item) => navigate(`/party/${item.name}`)}
      />
    </div>
  );
};

export default PartyCard;
