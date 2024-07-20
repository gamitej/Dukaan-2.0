import { useQuery } from "@tanstack/react-query";
// components
import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
// services
import { getAllOptionsDataApi } from "@/services/Options";
// data
import { prod } from "./data";

const AddCompany = () => {
  // =================== API CALL'S START ======================

  // Query to fetch all party data
  const { data: options = [] } = useQuery({
    queryKey: ["options", "get-company-category"],
    queryFn: () => getAllOptionsDataApi(),
  });

  console.log({ options });

  /**
   * TSX
   */
  return (
    <form className="flex gap-4">
      <InputField
        id="company"
        label="Company"
        value={""}
        width="35rem"
        handleChange={() => {}}
        placeholder="Enter product name..."
      />

      <Dropdown
        id="category"
        value={null}
        label="Category"
        options={prod}
        width="15rem"
        setInputChange={() => {}}
      />

      <button className="bg-lightDark text-white py-2 px-4 hover:bg-slate-500 rounded-sm shadow-md">
        submit
      </button>
    </form>
  );
};

export default AddCompany;
