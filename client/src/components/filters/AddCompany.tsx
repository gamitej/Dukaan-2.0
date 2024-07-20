import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
import { prod } from "./data";

const AddCompany = () => {
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
