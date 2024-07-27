import { FormEvent, useMemo } from "react";
// components
import { Fields } from "@/components/common/type";
import BasicModal from "@/components/model/BasicModel";
import AddProductDetailsForm from "@/components/common/AddProductDetailsForm";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import { formInputFieldsData } from "@/data/options";

const ReturnModel = () => {
  const { isModelOpen, setIsModelOpen, formData } = usePurchaseStore();

  const {
    categoryOptions = [],
    companyOptions = {},
    productOptions = {},
  } = useProduct();

  const formDropdownFieldsData: Fields[] = useMemo(() => {
    return [
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
  }, [companyOptions, productOptions, categoryOptions, formData.category]);

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
        title="Add Return Record"
      >
        <AddProductDetailsForm
          enableOrder
          disableCheckBox
          handleSubmit={handleSubmitForm}
          formInputFieldsData={formInputFieldsData}
          formDropdownFieldsData={formDropdownFieldsData}
        />
      </BasicModal>
    </div>
  );
};

export default ReturnModel;
