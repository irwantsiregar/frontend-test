"use client";

import DataTable from "@/components/ui/data-table";
import environment from "@/config/environtment";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useDisclosure } from "@/hooks/useDisclosure";
import type { User } from "@/types/Users";
import { cn } from "@/utils/cn";
import {
  Edit,
  Package,
  Plus,
  Trash2,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";

import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";
import useUsers from "./useUsers";

export default function User() {
  const [page, setPage] = useState(1);

  const {
    dataUsers,

    isLoadingUsers,
    isRefetchingUsers,

    refetchUsers,
    selectedId,
    setSelectedId,
  } = useUsers();

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

  const addUser = useDisclosure();
  const deleteUser = useDisclosure();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      "low-stock": {
        color: "bg-yellow-100 text-yellow-800",
        label: "Low Stock",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={cn(
          "rounded-full px-2 py-1 text-xs font-medium",
          config.color,
        )}
      >
        {config.label}
      </span>
    );
  };

  const columns: any = [
    {
      key: "image" as keyof User,
      header: "Image",
      render: (value: string) => (
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          {value ? (
            <img
              src={value ? `${environment.STORAGE_URL + value}` : ""}
              alt="Product"
              className="h-full w-full object-cover"
            />
          ) : (
            <Package className="h-6 w-6 text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: "name" as keyof User,
      header: "Name",
    },
    {
      key: "email" as keyof User,
      header: "Email",
    },
    {
      key: "isImmutable" as keyof User,
      header: "Status",
      render: (value: boolean) => getStatusBadge(value ? "active" : "inactive"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-gray-600">
            Manage system users and their roles
          </p>
        </div>
        <button
          onClick={() => addUser.onOpen()}
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataUsers?.meta?.totalItems || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Administrators</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataUsers?.result?.filter(
                  (user: User) => user?.role === "admin",
                ).length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center">
            <UserX className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Regular Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataUsers?.result?.filter(
                  (user: User) => user.role !== "admin",
                ).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={dataUsers?.result || []}
        columns={columns}
        searchable
        onSearch={() => {}}
        loading={isLoadingUsers || isRefetchingUsers}
        pagination={{
          page: Number(currentPage),
          limit: Number(currentLimit),
          total: dataUsers?.meta?.totalItems || 0,
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
                deleteUser.onOpen();
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

      {/* Add Modal */}
      <AddUserModal {...addUser} refetchUsers={refetchUsers} />

      {/* Delete Modal */}
      <DeleteUserModal
        {...deleteUser}
        refetchUsers={refetchUsers}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}
