"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Inventory from "@/components/views/Inventory/Inventory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InventoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.info("STATUS: ", status);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <DashboardLayout>
      <Inventory />
    </DashboardLayout>
  );
}
