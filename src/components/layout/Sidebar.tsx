"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Package,
  Users,
  Home,
  Menu,
  X,
  LogOut,
  Settings,
  BarChart3,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Users", href: "/users", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ className }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 rounded-md border border-gray-200 bg-white p-2 shadow-lg lg:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 h-screen w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                INT 101
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "border-r-2 border-blue-600 bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User actions */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
