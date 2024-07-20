import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
import { prod } from "./data";

const AddProduct = () => {
  /**
   * TSX
   */
  return (
    <form className="flex flex-col gap-4">
      <div className="w-full flex gap-2">
        <Dropdown
          id="category"
          value={null}
          label="Category"
          options={prod}
          width="19rem"
          setInputChange={() => {}}
        />

        <Dropdown
          id="company"
          value={null}
          label="Company"
          options={prod}
          width="20.5rem"
          setInputChange={() => {}}
        />
      </div>

      <InputField
        id="product"
        label="Product"
        value={""}
        width="100%"
        handleChange={() => {}}
        placeholder="Enter product name..."
      />

      <button className="bg-lightDark text-white py-3 hover:bg-slate-500 rounded-sm shadow-md">
        submit
      </button>
    </form>
  );
};

export default AddProduct;
