"use client";

import { useSession } from "next-auth/react";
import { Bell, Search, User } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6">
      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 transition-colors hover:text-gray-600">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>

        {/* User profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {session?.user?.name || "User"}
            </div>
            <div className="text-xs text-gray-500">
              {session?.user?.role || "Role"}
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
