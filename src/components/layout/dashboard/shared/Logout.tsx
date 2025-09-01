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
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useHandleLogOutMutation } from "@/Redux/features/auth/authApi";

export default function Logout() {
  const router = useRouter();
  const [handleLogOut] = useHandleLogOutMutation();

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

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <DropdownMenuGroup className="cursor-pointer flex items-center gap-2 py-1 hover:bg-gray-100 text-sm">
            <LogOut className="pl-3" size={28}/>
            Logout
          </DropdownMenuGroup>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
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
    </div>
  );
}
