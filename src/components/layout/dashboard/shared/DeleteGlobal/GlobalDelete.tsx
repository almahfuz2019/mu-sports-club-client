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
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
  onConfirm: () => void;
  loading?: boolean;
  validator: string;
}

const GlobalDelete: React.FC<DeleteDialogProps> = ({
  onConfirm,
  loading = false,
  validator,
}) => {
  const [inputValue, setInputValue] = useState("");

  const isMatch = inputValue === validator;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 text-red-600 p-2 hover:bg-red-50 w-full cursor-pointer">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <p className="text-sm text-muted-foreground mb-2">
            This action cannot be undone. This will permanently delete the item.
          </p>
          <p className="text-sm mb-1">
            Please type <span className="font-semibold">{validator}</span> to
            confirm.
          </p>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter bookingId"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={!isMatch || loading}
            className={`bg-red-600 text-white hover:bg-red-700 ${
              (!isMatch || loading) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalDelete;
