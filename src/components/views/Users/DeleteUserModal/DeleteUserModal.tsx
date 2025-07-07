import FormModal from "@/components/ui/form-modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteUserModal from "./useDeleteUserModal";

interface IDeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  refetchUsers: () => void;
}

const DeleteUserModal = (props: IDeleteUserModalProps) => {
  const { isOpen, onClose, selectedId, setSelectedId, refetchUsers } =
    props;

  const {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  } = useDeleteUserModal();

  useEffect(() => {
    if (isSuccessMutateDeleteUser) {
      onClose();
      refetchUsers();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteUser]);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedId("");
      }}
      title="Delete User"
      maxWidth="lg"
    >
      <div>
        <p className="mt-1 text-base text-slate-900">
          Are you sure want to delete this user?
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
          disabled={isPendingMutateDeleteUser}
        >
          Cancel
        </button>
        <button
          onClick={() => mutateDeleteUser(selectedId)}
          disabled={isPendingMutateDeleteUser}
          className="rounded-lg bg-red-400 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-red-500 disabled:opacity-90"
        >
          {isPendingMutateDeleteUser ? "Deleting..." : "Delete User"}
        </button>
      </div>
    </FormModal>
  );
};

export default DeleteUserModal;
