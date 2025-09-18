"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Counts Section Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-lg shadow-sm flex items-center justify-between p-4"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-6 w-12 bg-gray-400 rounded"></div>
            </div>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Stats Section Skeleton */}
      <div className="grid sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg shadow-sm"></div>
        ))}
      </div>

      {/* Recent Activities Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="space-y-4 bg-gray-200 rounded-lg shadow-sm p-4 h-64"
          >
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-4 w-full bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Trends & Status Breakdown Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-80 bg-gray-200 rounded-lg shadow-sm"></div>
        <div className="h-80 bg-gray-200 rounded-lg shadow-sm"></div>
      </div>

      {/* Insights Skeleton */}
      <div className="h-32 bg-gray-200 rounded-lg shadow-sm"></div>
    </div>
  );
}
