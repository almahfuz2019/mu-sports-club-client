"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export default function DashboardError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-red-200 bg-red-50 rounded-lg space-y-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h2 className="text-xl font-semibold text-red-600">
        Oops! Something went wrong
      </h2>
      <p className="text-sm text-red-500">
        {message || "Failed to load dashboard data. Please try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </button>
      )}
    </div>
  );
}
