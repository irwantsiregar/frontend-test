import FormModal from "@/components/ui/form-modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteInventoryModal from "./useDeleteInventoryModal";

interface IDeleteInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  refetchInventories: () => void;
}

const DeleteInventoryModal = (props: IDeleteInventoryModalProps) => {
  const {
    isOpen,
    onClose,
    selectedId,
    setSelectedId,
    refetchInventories,
  } = props;

  const {
    mutateDeleteInventory,
    isPendingMutateDeleteInventory,
    isSuccessMutateDeleteInventory,
  } = useDeleteInventoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteInventory) {
      onClose();
      refetchInventories();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteInventory]);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedId("");
      }}
      title="Delete Item"
      maxWidth="lg"
    >
      <div>
        <p className="mt-1 text-base text-slate-900">
          Are you sure want to delete this item?
        </p>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => {
            onClose();
            setSelectedId("");
          }}
          className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:cursor-pointer hover:bg-slate-100 hover:text-gray-800"
          disabled={isPendingMutateDeleteInventory}
        >
          Cancel
        </button>
        <button
          onClick={() => mutateDeleteInventory(selectedId)}
          disabled={isPendingMutateDeleteInventory}
          className="rounded-lg bg-red-400 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-red-500 disabled:opacity-90"
        >
          {isPendingMutateDeleteInventory ? "Deleting..." : "Delete Item"}
        </button>
      </div>
    </FormModal>
  );
};

export default DeleteInventoryModal;
