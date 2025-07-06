"use client";

import { useCallback, useState } from "react";

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback is used to memoize these functions, preventing unnecessary re-renders
  // of components that receive these functions as props.
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    onOpenChange,
  };
}
