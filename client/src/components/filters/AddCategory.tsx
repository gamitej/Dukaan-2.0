import InputField from "../fields/InputField";

const AddCategory = () => {
  /**
   * TSX
   */
  return (
    <form className="flex gap-4">
      <InputField
        id="category"
        label="Category"
        value={""}
        width="35rem"
        handleChange={() => {}}
        placeholder="Enter product name..."
      />

      <button className="bg-lightDark text-white py-2 px-4 hover:bg-slate-500 rounded-sm shadow-md">
        submit
      </button>
    </form>
  );
};

export default AddCategory;
