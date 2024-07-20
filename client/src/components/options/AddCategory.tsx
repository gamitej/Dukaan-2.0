import { ChangeEvent, useState } from "react";
import InputField from "../fields/InputField";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  /**
   * TSX
   */
  return (
    <form className="flex gap-4">
      <InputField
        id="category"
        label="Category"
        value={category}
        width="35rem"
        handleChange={handleInputChange}
        placeholder="Enter product name..."
      />

      <button
        type="submit"
        disabled={category?.length < 4}
        className="disabled:bg-slate-300 bg-lightDark text-white py-2 px-4 hover:bg-slate-500 rounded-sm shadow-md"
      >
        submit
      </button>
    </form>
  );
};

export default AddCategory;
