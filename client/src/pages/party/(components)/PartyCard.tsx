import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// components
import ItemCard from "@/components/cards/ItemCard";
// services
import { getAllPartiesDataApi } from "@/services/Party";

const PartyCard = () => {
  const navigate = useNavigate();

  // =================== API CALL'S START ======================

  // Query to fetch all party data
  const { data: partiesData = [], isLoading } = useQuery({
    queryKey: ["party", "name"],
    queryFn: () => getAllPartiesDataApi(),
  });

  /**
   * TSX
   */
  return (
    <div>
      <ItemCard
        data={partiesData}
        isLoading={isLoading}
        handleClick={(item) => navigate(`/parties/${item.id}/${item.name}`)}
      />
    </div>
  );
};

export default PartyCard;
