import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import { commonCols } from "@/data/CommonTable";
import CopyCode from "@/components/common/CopyCode";
import CommonTable from "@/components/table/CommonTable";
import PurchaseModal from "../(components)/PurchaseModal";
// store
import { usePurchaseStore } from "@/store/purchaseStore";
// services
import { getPartyWisePuchaseDataApi } from "@/services/Purchase";
import ConfirmationModel from "@/components/model/ConfirmationModel";
import { useConfirmationStore } from "@/store/confirmationModelStore";
import { formattedPurchaseTableColumns } from "../data/func";

const PurchaseTable = ({ partyId = "" }: { partyId: string }) => {
  const { setIsModelOpen } = usePurchaseStore();

  const { isConfirmationModelOpen, setIsConfirmationModelOpen, selectedId } =
    useConfirmationStore();

  /**
   * ========================= API CALL ===========================
   */

  // Query to fetch party purchase data
  const { data: partyPurchaseRowsData = [], isLoading } = useQuery({
    queryKey: ["purchase-add-data", partyId],
    queryFn: () => getPartyWisePuchaseDataApi(partyId),
  });

  /**
   * =========================== EVENT-HANDLER =======================
   */

  // formatted columns data
  const formattedCols = useMemo(() => {
    return formattedPurchaseTableColumns(commonCols);
  }, [commonCols]);

  const handleDelete = ({ original }: { original: any }) => {
    console.log({ original });
    setIsConfirmationModelOpen("hi");
  };

  /**
   * TSX
   */
  return (
    <div>
      <ConfirmationModel
        message="Are you sure you want to delete ?"
        handleConfirm={() => "yes"}
        open={isConfirmationModelOpen}
        handleClose={setIsConfirmationModelOpen}
      />
      <PurchaseModal partyId={partyId} />
      <CommonTable
        enableEditing
        openDeleteConfirmModal={handleDelete}
        isLoading={isLoading}
        topToolbarComp={
          <div>
            <button
              onClick={setIsModelOpen}
              className="hover:bg-indigo-500 cursor-pointer bg-indigo-400 py-2 px-3 text-white rounded-sm"
            >
              Add Payment
            </button>
          </div>
        }
        columns={formattedCols}
        rows={partyPurchaseRowsData}
      />
    </div>
  );
};

export default PurchaseTable;
