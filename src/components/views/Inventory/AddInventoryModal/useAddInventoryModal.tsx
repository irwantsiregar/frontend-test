import { ToasterContext } from "@/contexts/ToasterContexts";
import inventoryServices from "@/services/inventory.services";
import { IInventoryForm } from "@/types/Inventory";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addInventorySchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  code: yup.string().required("Please input code"),
  stockQuantity: yup.number().required("Please stock quantity"),
  description: yup.string().required("Please input description"),
});

const useAddInventoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    register,
    formState: { errors },
    handleSubmit: handleSubmitForm,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(addInventorySchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | string>("");

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addInventory = async (data: IInventoryForm) => {
    const formData = new FormData();

    const payload = {
      ...data,
    };

    if (selectedImage) {
      formData.append("image", selectedImage);
      payload.image = formData.get("image") || "";
    }

    const response = await inventoryServices.addInventory(payload);

    return response;
  };

  const {
    mutate: mutateAddInventory,
    isPending: isPendingMutateAddInventory,
    isSuccess: isSuccessMutateAddInventory,
  } = useMutation({
    mutationFn: addInventory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: () => {
      reset();

      setToaster({
        type: "success",
        message: "Success add category",
      });
    },
  });

  const handleAddInventory = (data: IInventoryForm) => mutateAddInventory(data);

  return {
    register,
    errors,
    reset,
    handleSubmitForm,
    handleAddInventory,
    handleOnClose,

    isPendingMutateAddInventory,
    isSuccessMutateAddInventory,

    setValue,

    setSelectedImage,
    selectedImage,
  };
};

export default useAddInventoryModal;
