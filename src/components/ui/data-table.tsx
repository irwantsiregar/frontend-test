"use client";

import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  onSearch?: (query: string) => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  actions?: (row: T) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  onSearch,
  pagination,
  actions,
  loading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  if (loading) {
    return (
      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="mb-4 h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow">
      {/* Search */}
      {searchable && (
        <div className="border-b border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm whitespace-nowrap text-gray-900"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
          <div className="text-sm text-gray-700">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                pagination.page === 1
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination.page} of {totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                pagination.page === totalPages
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
