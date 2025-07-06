"use client";

import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function FormModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: FormModalProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="bg-opacity-50 absolute inset-0 bg-black transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative mx-4 max-h-[90vh] w-full overflow-y-auto rounded-lg bg-white shadow-xl",
          maxWidthClasses[maxWidth],
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500 hover:cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
