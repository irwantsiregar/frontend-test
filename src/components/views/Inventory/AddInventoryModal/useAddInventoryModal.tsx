import { ToasterContext } from "@/contexts/ToasterContexts";
import { IInventoryForm } from "@/types/Inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import inventoryServices from "@/services/inventory.services";

import { z } from "zod";

const addInventorySchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
  stockQuantity: z.number(),
  image: z
    .union([
      z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => !file || file.size !== 0 || file.size <= 5000000, {
          message: "Max size exceeded",
        }),
      z.string().optional(), // to hold default image
    ])
    .refine((value) => value instanceof File || typeof value === "string", {
      message: "Image is required",
    }),
});

type addInventoryFormData = z.infer<typeof addInventorySchema>;

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
    resolver: zodResolver(addInventorySchema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  console.log(preview)

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addInventory = async (payload: IInventoryForm) => {
    const response = await inventoryServices.addInventory(payload);

    console.info("RES: ", response);

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

    preview,

    setValue,
  };
};

export default useAddInventoryModal;
