import { ChangeEvent } from "react";
// components
import Dropdown from "@/components/fields/Dropdown";
import InputField from "@/components/fields/InputField";
import BasicModal from "@/components/model/BasicModel";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { FormDataPurchase, usePurchaseStore } from "@/store/purchaseStore";

const PurchaseModal = () => {
  const { isModelOpen, setIsModelOpen, formData, setFormData } =
    usePurchaseStore();

  const {
    categoryOptions = [],
    companyOptions = {},
    productOptions = {},
  } = useProduct();

  const formDropdownFieldsData = [
    {
      id: "category",
      width: "100%",
      type: "dropdown",
      label: "Category",
      options: categoryOptions,
    },
    {
      id: "product",
      options: productOptions[formData.category],
      width: "100%",
      type: "dropdown",
      label: "Product",
    },
    {
      id: "company",
      options: companyOptions[formData.category],
      width: "100%",
      type: "dropdown",
      label: "Company",
    },
  ];

  const formInputFieldsData = [
    {
      id: "price",
      label: "Price",
      width: "60%",
      type: "input",
      placeholder: "enter price...",
    },
    {
      width: "20%",
      type: "input",
      id: "quantity",
      label: "Quantity",
      placeholder: "enter quantity...",
    },
    {
      id: "weight",
      options: [],
      width: "20%",
      label: "Weight",
      type: "dropdown",
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(name, value);
  };

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        modalHeight="fitContent"
        modalWidth="45rem"
        title="Add Purchase Record"
        isOpen={isModelOpen}
        onClose={setIsModelOpen}
      >
        <form className="flex flex-col gap-6 mt-2">
          <div className="flex justify-between gap-2">
            {formDropdownFieldsData.map((field, idx) => (
              <Dropdown
                key={idx}
                id={field.id}
                width={field.width}
                label={field.label}
                value={formData[field.id as keyof FormDataPurchase]}
                options={field.options}
                setInputChange={(value: string) => {
                  setFormData(field.id, value);
                }}
              />
            ))}
          </div>
          <div className="flex justify-between gap-2">
            {formInputFieldsData.map((field, idx) => (
              <div key={idx} style={{ width: field.width }}>
                {field.type === "input" ? (
                  <InputField
                    id={field.id}
                    width={"100%"}
                    label={field.label}
                    value={formData[field.id as keyof FormDataPurchase]}
                    handleChange={handleInputChange}
                    placeholder={field.placeholder ? field.placeholder : ""}
                  />
                ) : (
                  <Dropdown
                    id={field.id}
                    width={"100%"}
                    label={field.label}
                    options={field.options ? field.options : []}
                    value={formData[field.id as keyof FormDataPurchase]}
                    setInputChange={(value: string) => {
                      setFormData(field.id, value);
                    }}
                  />
                )}
              </div>
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
