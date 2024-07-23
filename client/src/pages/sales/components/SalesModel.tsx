import { FormEvent } from "react";
// components
import { Fields } from "@/components/common/type";
import BasicModal from "@/components/model/BasicModel";
import AddProductDetailsForm from "@/components/common/AddProductDetailsForm";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { usePurchaseStore } from "@/store/purchaseStore";

const SalesModel = () => {
  const { isModelOpen, setIsModelOpen, formData } = usePurchaseStore();

  const {
    categoryOptions = [],
    companyOptions = {},
    productOptions = {},
  } = useProduct();

  const formDropdownFieldsData: Fields[] = [
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

  const formInputFieldsData: Fields[] = [
    {
      id: "price",
      label: "Price",
      width: "60%",
      inputField: "number",
      type: "input",
      placeholder: "enter price...",
    },
    {
      width: "20%",
      type: "input",
      id: "quantity",
      inputField: "number",
      label: "Quantity",
      placeholder: "enter quantity...",
    },
    {
      id: "weight",
      type: "input",
      width: "20%",
      label: "Weight",
      inputField: "text",
      placeholder: "enter weight...",
    },
  ];

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /**
   * TSX
   */
  return (
    <div>
      <BasicModal
        modalWidth="45rem"
        isOpen={isModelOpen}
        modalHeight="fitContent"
        onClose={setIsModelOpen}
        title="Add Sales Record"
      >
        <AddProductDetailsForm
          handleSubmit={handleSubmitForm}
          formInputFieldsData={formInputFieldsData}
          formDropdownFieldsData={formDropdownFieldsData}
        />
      </BasicModal>
    </div>
  );
};

export default SalesModel;
