// components
import BasicModal from "@/components/model/BasicModel";
// hooks
import { useProduct } from "@/hooks/useProducts";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
import AddProductDetailsForm from "@/components/common/AddProductDetailsForm";

const PurchaseModal = () => {
  const { isModelOpen, setIsModelOpen, formData } = usePurchaseStore();

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
      type: "input",
      width: "20%",
      label: "Weight",
      placeholder: "enter weight...",
    },
  ];

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
        title="Add Purchase Record"
      >
        <AddProductDetailsForm
          enableOrder
          formInputFieldsData={formInputFieldsData}
          formDropdownFieldsData={formDropdownFieldsData}
        />
      </BasicModal>
    </div>
  );
};

export default PurchaseModal;
