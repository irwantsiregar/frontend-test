"use client";

import DataTable from "@/components/ui/data-table";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useDisclosure } from "@/hooks/useDisclosure";
import type { InventoryItem } from "@/types/Inventory";
import { cn } from "@/utils/cn";
import { AlertCircle, Edit, Package, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteInventoryModal from "./DeleteInventoryModal";
import useInventory from "./useInventory";

export default function Inventory() {
  const [page, setPage] = useState(1);

  const {
    dataInventories,

    isLoadingInventories,
    isRefetchingInventories,

    refetchInventories,
    selectedId,
    setSelectedId,
  } = useInventory();

  const {
    setURL,
    isReady,
    currentPage,
    currentLimit,
    handleChangePage,
    handleSearch,
  } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  useEffect(() => {
    handleChangePage(page);
  }, [page]);

  const deleteInventory = useDisclosure();

  const columns: any = [
    {
      key: "name" as keyof InventoryItem,
      header: "Name",
    },
    {
      key: "code" as keyof InventoryItem,
      header: "SKU",
    },
    {
      key: "stockQuantity" as keyof InventoryItem,
      header: "Quantity",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="mt-1 text-gray-600">Manage your inventory items</p>
        </div>
        <button
          onClick={() => {}}
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataInventories?.meta?.totalItems || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataInventories?.result?.filter(
                  (item: { stockQuantity: number }) => item.stockQuantity <= 20,
                ).length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataInventories?.result?.filter(
                  (item: { stockQuantity: number }) => item.stockQuantity > 20,
                ).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={dataInventories?.result || []}
        columns={columns}
        searchable
        onSearch={() => {}}
        loading={isLoadingInventories || isRefetchingInventories}
        pagination={{
          page: Number(currentPage),
          limit: Number(currentLimit),
          total: dataInventories?.meta?.totalItems || 0,
          onPageChange: setPage,
        }}
        actions={(item) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {}}
              className="rounded p-1 text-blue-600 hover:cursor-pointer hover:bg-blue-50 hover:text-blue-700"
            >
              <Edit className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setSelectedId(`${item?.id}`);
                deleteInventory.onOpen();
              }}
              className={cn(
                "rounded p-1 transition-colors hover:cursor-pointer",
                "text-red-600 hover:bg-red-50 hover:text-red-700",
              )}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      {/* Delete Modal */}
      <DeleteInventoryModal
        {...deleteInventory}
        refetchInventories={refetchInventories}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}
