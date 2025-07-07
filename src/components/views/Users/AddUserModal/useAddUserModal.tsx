import { ToasterContext } from "@/contexts/ToasterContexts";
import usersServices from "@/services/users.services";
import { IAddUserForm } from "@/types/Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type addUserFormData = z.infer<typeof addUserSchema>;

const useAddUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    register,
    formState: { errors },
    handleSubmit: handleSubmitForm,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<addUserFormData>({
    resolver: zodResolver(addUserSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | string>("");

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addUser = async (data: IAddUserForm) => {
    const formData = new FormData();

    const payload = {
      ...data,
    };

    if (selectedImage) {
      formData.append("image", selectedImage);
      payload.image = formData.get("image") || "";
    }

    const response = await usersServices.addUser(payload);

    return response;
  };

  const {
    mutate: mutateAddUser,
    isPending: isPendingMutateAddUser,
    isSuccess: isSuccessMutateAddUser,
  } = useMutation({
    mutationFn: addUser,
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
        message: "Success add user",
      });
    },
  });

  const handleAddUser = (data: IAddUserForm) => mutateAddUser(data);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return {
    isVisible,
    toggleVisibility,

    register,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    handleOnClose,

    isPendingMutateAddUser,
    isSuccessMutateAddUser,

    setValue,

    setSelectedImage,
    selectedImage,
  };
};

export default useAddUserModal;
