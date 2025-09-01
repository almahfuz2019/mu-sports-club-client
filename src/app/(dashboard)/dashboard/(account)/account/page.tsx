"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Edit2} from "lucide-react";
import { GiDuck } from "react-icons/gi";
import {
  useGetCurrentUserQuery,
  useHandleUpdatePasswordMutation,
} from "@/Redux/features/auth/authApi";
import Loading from "@/components/layout/shared/Loading";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface IDeleteAccountRequest {
  password: string;
}

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload?: Record<string, unknown>;
}

const AdminAccount = () => {
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUserQuery();
  const user = currentUser?.payload;

  const [
    handleUpdatePassword,
    { isLoading: updatePasswordLoading, error: updatePasswordError },
  ] = useHandleUpdatePasswordMutation();


  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
    password: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<IUpdatePasswordRequest>();


  const [successCode, setSuccessCode] = useState<number>(0);

  const passwordUpdate = async (formData: IUpdatePasswordRequest) => {
    try {
      await handleUpdatePassword(formData).unwrap();
      toast.success("Password updated successfully");
      setSuccessCode(200);
      reset();
    } catch {
      toast.error("❌ Failed to update password. Please try again.");
    }
  };

  const router = useRouter();

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (currentUserLoading) {
    return <Loading />;
  }
  if (!currentUser?.payload) {
    return (
      <div className="flex items-center justify-center  bg-gradient-to-br ">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm">
          <p className="text-xl text-red-600 flex items-center justify-center">
            No Data Found <GiDuck className="text-3xl ml-2" />
          </p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className=" bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your personal information and account security
          </p>
        </div>

        <Card className="rounded-sm  overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-white">
            <CardTitle className="text-2xl">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">
                  {user?.name}
                </h2>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">
                  {user?.email}
                </h2>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Account Actions
                </h3>
                <div className="flex flex-wrap gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Change Password
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl">
                          Update Your Password
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                          For security, please verify your current password
                          before setting a new one.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <form
                        onSubmit={handleSubmit(passwordUpdate)}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative">
                            <Input
                              type={
                                passwordVisibility.oldPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Enter current password"
                              className="pr-10"
                              {...register("oldPassword", {
                                required: "Current password is required",
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must be at least 6 characters",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                  message:
                                    "Must include letter, number, and special character",
                                },
                              })}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("oldPassword")
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {passwordVisibility.oldPassword ? (
                                <FaEyeSlash className="h-5 w-5" />
                              ) : (
                                <IoEyeSharp className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          {errors.oldPassword && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.oldPassword.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <Input
                              type={
                                passwordVisibility.newPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Enter new password"
                              className="pr-10"
                              {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                  value: 6,
                                  message:
                                    "Password must be at least 6 characters",
                                },
                                pattern: {
                                  value:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                  message:
                                    "Must include letter, number, and special character",
                                },
                              })}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {passwordVisibility.newPassword ? (
                                <FaEyeSlash className="h-5 w-5" />
                              ) : (
                                <IoEyeSharp className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.newPassword.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <Input
                              type={
                                passwordVisibility.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Confirm new password"
                              className="pr-10"
                              {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: (value) =>
                                  value === watch("newPassword") ||
                                  "Passwords don't match",
                              })}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {passwordVisibility.confirmPassword ? (
                                <FaEyeSlash className="h-5 w-5" />
                              ) : (
                                <IoEyeSharp className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div>

                        <div className="mt-2">
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            disabled={updatePasswordLoading}
                          >
                            {updatePasswordLoading ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Updating...
                              </span>
                            ) : (
                              "Update Password"
                            )}
                          </Button>
                        </div>

                        {updatePasswordError &&
                          "data" in updatePasswordError && (
                            <div className="mt-2 text-center">
                              <Badge variant="destructive" className="text-sm">
                                {(() => {
                                  const errorData =
                                    updatePasswordError.data as ErrorResponse;
                                  switch (errorData.statusCode) {
                                    case 401:
                                      return "Current password is incorrect";
                                    case 403:
                                      return "New and confirm password don't match";
                                    case 404:
                                      return "User not found";
                                    case 500:
                                      return "Server error. Please try again later.";
                                    default:
                                      return "Failed to update password";
                                  }
                                })()}
                              </Badge>
                            </div>
                          )}

                        {successCode === 200 && (
                          <div className="mt-2 text-center">
                            <Badge variant="default" className="text-sm">
                              Password updated successfully!
                            </Badge>
                          </div>
                        )}
                      </form>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="mt-2">
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminAccount;
