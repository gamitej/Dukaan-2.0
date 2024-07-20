import { ChangeEvent, FormEvent, useMemo, useState } from "react";
//  components
import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
// custom hook
import { useCompanyAndCategory } from "@/hooks/useCompanyAndCategory";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    company: "",
    category: "",
    product: "",
  });

  // Query to fetch all options data
  const { categoryOptions = [], companyOptions = {} } = useCompanyAndCategory();

  const selectedCategoryCompanyOptions = useMemo(() => {
    if (formData.category.length > 0) {
      if (formData.category in companyOptions) {
        return companyOptions[formData.category];
      }
      return [];
    }
    return [];
  }, [companyOptions, formData.category]);

  // ===================== EVENT-HANDLER =======================

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // mutateAddCompanyAndCategoryData(formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, company: e.target.value });
  };

  /**
   * TSX
   */
  return (
    <form className="flex flex-col gap-4">
      <div className="w-full flex gap-2">
        <Dropdown
          id="category"
          width="19rem"
          label="Category"
          options={categoryOptions}
          value={formData.category}
          setInputChange={(value: string) => {
            setFormData((prev) => ({ ...prev, category: value }));
          }}
        />

        <Dropdown
          id="company"
          label="Company"
          width="20.5rem"
          isDisabled={formData.category.length === 0}
          value={formData.company}
          setInputChange={(value: string) => {
            setFormData((prev) => ({ ...prev, company: value }));
          }}
          options={selectedCategoryCompanyOptions}
        />
      </div>

      <InputField
        id="product"
        width="100%"
        label="Product"
        value={formData.product}
        handleChange={handleInputChange}
        placeholder="Enter product name..."
      />

      <button
        disabled={formData.product.length < 4 && formData.category.length < 4}
        className=" disabled:bg-slate-300 bg-lightDark text-white py-3 hover:bg-slate-500 rounded-sm shadow-md"
      >
        submit
      </button>
    </form>
  );
};

export default AddProduct;
