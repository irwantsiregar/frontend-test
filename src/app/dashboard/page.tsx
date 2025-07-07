"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { AlertTriangle, Package, TrendingUp, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="mb-2 text-3xl font-bold">
            Welcome back, {session?.user?.name || "User"}!
          </h1>
          <p className="text-blue-100">
            Here's an overview of your inventory management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{40}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${25.0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{24}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-lg bg-yellow-100 p-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{40}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Inventory
            </h3>
            <div className="space-y-3">
              {/* Items Inventory */}
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium text-gray-900">{"Inventory"}</p>
                  <p className="text-sm text-gray-600">{"ATK"}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${"20.33"}</p>
                  <p className="text-sm text-gray-600">Qty: {8}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              onClick={() => router.push("/inventory")}
              className="rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100"
            >
              <Package className="mb-2 h-6 w-6 text-blue-600" />
              <p className="font-medium text-gray-900">Manage Inventory</p>
              <p className="text-sm text-gray-600">
                Add, edit, or remove items
              </p>
            </button>
            <button
              onClick={() => router.push("/users")}
              className="rounded-lg bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100"
            >
              <Users className="mb-2 h-6 w-6 text-purple-600" />
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">Add or edit user accounts</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
