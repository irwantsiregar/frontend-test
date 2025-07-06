"use client";

import { cn } from "@/utils/cn";
import { Eye, EyeOff, Package } from "lucide-react";
import useLogin from "./useLogin";

export default function LoginPage() {
  const {
    isVisible,
    toggleVisibility,
    register,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
    toaster,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-blue-600 p-3">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">INT 101</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div>
            {!!toaster?.message && (
              <p className="mb-2 font-medium text-red-500">
                {toaster?.message}
              </p>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={cn(
                  "w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500",
                  errors.email ? "border-red-500" : "border-gray-300",
                )}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 pr-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500",
                    errors.password ? "border-red-500" : "border-gray-300",
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                >
                  {isVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPendingLogin}
              className={cn(
                "w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors",
                isPendingLogin
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              )}
            >
              {isPendingLogin ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
