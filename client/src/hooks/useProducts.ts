// import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProductDataApi } from "@/services/Options";
import { useMemo } from "react";

type Response = { category: string; companies: string[]; products: string[] };

type Options = { label: string; value: string; id: string | number };

export const useProduct = () => {
  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch all options data
  const { data: options = [] } = useQuery<Response[]>({
    queryKey: ["products", "get-company-category-products"],
    queryFn: () => getAllProductDataApi(),
  });

  /**
   * ======================= FORMATE THE DATA =====================
   */

  const getOption = (value: string) => {
    return { value: value, label: value, id: value };
  };

  const formattedOptions = useMemo(() => {
    if (options.length === 0)
      return { categoryOptions: [], companyOptions: {}, productOptions: {} };

    const categoryOptions: Options[] = [];
    const companyOptions: { [key: string]: Options[] } = {};
    const productOptions: { [key: string]: Options[] } = {};

    options?.forEach((option) => {
      categoryOptions.push(getOption(option.category));

      companyOptions[option?.category] = option?.companies?.map((item) =>
        getOption(item)
      );

      productOptions[option?.category] = option?.products?.map((item) =>
        getOption(item)
      );
    });

    return { categoryOptions, companyOptions, productOptions };
  }, [options]);

  return {
    categoryOptions: formattedOptions.categoryOptions,
    companyOptions: formattedOptions.companyOptions,
    productOptions: formattedOptions.productOptions,
  };
};
