"use client";

import Toaster from "@/components/ui/toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContexts";
import { ReactNode, useContext, useEffect } from "react";

interface PropTypes {
  children: ReactNode;
}

const AppShell = ({ children }: PropTypes) => {
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toaster]);

  return (
    <main>
      {children}

      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </main>
  );
};

export default AppShell;
