// import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductDataApi } from "@/services/Options";

export const useProduct = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: options = {} } = useQuery({
    queryKey: ["products", "get-company-category-products"],
    queryFn: () => getAllProductDataApi(),
  });

  console.log({ options });

  return { data: [] };

  /**
   * ======================= FORMATE THE DATA =====================
   */
};
