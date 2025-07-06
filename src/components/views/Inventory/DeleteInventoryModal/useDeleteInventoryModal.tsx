import { ToasterContext } from "@/contexts/ToasterContexts";
import inventoryServices from "@/services/inventory.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteInventoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteInventory = async (id: string) => {
    console.log("ID", id);
    const response = await inventoryServices.deleteInventory(id);

    return response;
  };

  const {
    mutate: mutateDeleteInventory,
    isPending: isPendingMutateDeleteInventory,
    isSuccess: isSuccessMutateDeleteInventory,
  } = useMutation({
    mutationFn: deleteInventory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete inventory success",
      });
    },
  });

  return {
    mutateDeleteInventory,
    isPendingMutateDeleteInventory,
    isSuccessMutateDeleteInventory,
  };
};

export default useDeleteInventoryModal;
