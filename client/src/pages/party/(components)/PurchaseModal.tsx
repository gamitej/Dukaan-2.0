import Dropdown from "@/components/fields/Dropdown";
import InputField from "@/components/fields/InputField";
import BasicModal from "@/components/model/BasicModel";
import { useProduct } from "@/hooks/useProducts";
import { usePurchaseStore } from "@/store/purchaseStore";

const PurchaseModal = () => {
  const { isModelOpen, setIsModelOpen, formData } = usePurchaseStore();

  const { data } = useProduct();

  const formDropdownFieldsData = [
    {
      id: "category",
      options: [],
      width: "100%",
      type: "dropdown",
      label: "Category",
      value: formData.category,
    },
    {
      id: "product",
      options: [],
      width: "100%",
      type: "dropdown",
      label: "Product",
      value: formData.product,
    },
    {
      id: "company",
      options: [],
      width: "100%",
      type: "dropdown",
      label: "Company",
      value: formData.company,
    },
  ];

  const formInputFieldsData = [
    {
      id: "price",
      options: [],
      label: "Price",
      width: "60%",
      type: "input",
      value: formData.product,
      placeholder: "enter price...",
    },
    {
      options: [],
      width: "20%",
      type: "input",
      id: "quantity",
      label: "Quantity",
      value: formData.product,
      placeholder: "enter quantity...",
    },
    {
      id: "weight",
      options: [],
      width: "20%",
      label: "Weight",
      type: "dropdown",
      value: formData.company,
    },
  ];

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        title="Add Purchase Record"
        isOpen={isModelOpen}
        onClose={setIsModelOpen}
      >
        <form className="flex flex-col gap-6 mt-2">
          <div className="flex justify-between gap-2">
            {formDropdownFieldsData.map((field) => (
              <Dropdown
                id={field.id}
                width={field.width}
                label={field.label}
                value={formData.category}
                options={field.options}
                setInputChange={(value: string) => {
                  // setFormData((prev) => ({ ...prev, category: value }));
                }}
              />
            ))}
          </div>
          <div className="flex justify-between gap-2">
            {formInputFieldsData.map((field) => (
              <>
                {field.type === "input" ? (
                  <InputField
                    id={field.id}
                    width={field.width}
                    label={field.label}
                    value={field.value}
                    handleChange={() => {}}
                    placeholder={field.placeholder ? field.placeholder : ""}
                  />
                ) : (
                  <Dropdown
                    id={field.id}
                    width={field.width}
                    label={field.label}
                    value={formData.category}
                    options={field.options}
                    setInputChange={(value: string) => {
                      // setFormData((prev) => ({ ...prev, category: value }));
                    }}
                  />
                )}
              </>
            ))}
          </div>

          <button className="bg-mediumDark text-white py-3 rounded-sm shadow-md">
            submit
          </button>
        </form>
      </BasicModal>
    </div>
  );
};

export default PurchaseModal;
