import { ToasterContext } from "@/contexts/ToasterContexts";
import usersServices from "@/services/users.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteUser = async (id: string) => {
    const response = await usersServices.deleteUser(id);

    return response;
  };

  const {
    mutate: mutateDeleteUser,
    isPending: isPendingMutateDeleteUser,
    isSuccess: isSuccessMutateDeleteUser,
  } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete user success",
      });
    },
  });

  return {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  };
};

export default useDeleteUserModal;
