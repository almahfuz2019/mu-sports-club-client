"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  useGetCurrentUserQuery,
  useHandleLogOutMutation,
} from "@/Redux/features/auth/authApi";
import Link from "next/link";
import React from "react";

export default function Page() {
  const router = useRouter();
  const [handleLogOut] = useHandleLogOutMutation();
  const { data } = useGetCurrentUserQuery();

  const logOut = async () => {
    try {
      await handleLogOut().unwrap();
      toast.success("Successfully logged out!");
      router.push("/");
      location.reload();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred during logout");
    }
  };

  const isBanned = data?.payload?.isBanned;

  return (
    <main className="flex items-center justify-center px-6 py-4 h-screen w-screen bg-black">
      <div className="flex items-center space-x-4">
        {data?.payload ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className=" text-gray-300 hover:text-white transition-colors ">
                Logout
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="ml-auto">
                <AlertDialogCancel className="cursor-pointer rounded-sm">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={logOut}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link href="/login">
            <div className="text-gray-300 hover:text-white transition-colors">
              Login
            </div>
          </Link>
        )}
        {!isBanned && data?.payload?.role === "admin" && (
          <Link href="/dashboard">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Dashboard
            </div>
          </Link>
        )}
      </div>
    </main>
  );
}
