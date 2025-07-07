"use client";

import FormModal from "@/components/ui/form-modal";
import { cn } from "@/utils/cn";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useAddUserModal from "./useAddUserModal";

interface IAddUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchUsers: () => void;
}

const AddUsersModal = (props: IAddUsersModalProps) => {
  const { isOpen, onClose, refetchUsers } = props;

  const {
    register,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    handleOnClose,

    isPendingMutateAddUser,
    isSuccessMutateAddUser,

    setSelectedImage,
    selectedImage,

    isVisible,
    toggleVisibility,
  } = useAddUserModal();

  useEffect(() => {
    if (isSuccessMutateAddUser) {
      onClose();
      refetchUsers();
    }
  }, [isSuccessMutateAddUser]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setSelectedImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
        setImagePreview(null);
        setSelectedImage("");
      }}
      title={"Add New Item"}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmitForm(handleAddUser)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>

          {imagePreview ? (
            <div className="group relative h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleImageUpload}
              className="group flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-blue-400 hover:bg-blue-50"
            >
              <Upload className="mb-2 h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-500" />
              <span className="text-center text-xs text-gray-500 transition-colors group-hover:text-blue-600">
                Click to upload
              </span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            multiple={false}
          />

          <p className="text-xs text-gray-500">
            Upload a product image (JPG, PNG, GIF up to 5MB)
          </p>
        </div>

        {/* Form Fields */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={cn(
              "w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500",
              errors.name ? "border-red-500" : "border-gray-300",
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={cn(
              "w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500",
              errors.email ? "border-red-500" : "border-gray-300",
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={cn(
                "w-full rounded-lg border px-4 py-3 pr-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500",
                errors.password ? "border-red-500" : "border-gray-300",
              )}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
            >
              {isVisible ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              setImagePreview(null);
              setSelectedImage("");
            }}
            className="px-4 py-2 text-gray-600 transition-colors hover:cursor-pointer hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPendingMutateAddUser}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
          >
            {isPendingMutateAddUser ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Create User</span>
            )}
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default AddUsersModal;
