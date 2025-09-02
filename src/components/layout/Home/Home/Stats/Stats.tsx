"use client";

import { useHandleFindStatsQuery } from "@/Redux/features/stats/statsApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stats() {
  const { data, isLoading } = useHandleFindStatsQuery({
    page: 1,
    limit: 1,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  return (
    <div className="bg-onyx-black px-[5%]">
      <div className="max-w-screen-xl mx-auto pt-16 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-white">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="relative mx-auto sm:mx-0" key={i}>
                <div className="absolute border-2 rounded-full border-white top-0 h-40 w-40 z-10"></div>
                <div className="absolute bg-white/10 rounded-full top-1 left-1 h-[156px] w-[156px] z-20"></div>
                <div className="relative z-50 flex items-center justify-center h-40 w-40">
                  <Skeleton className="h-10 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          allData.map((item: any) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-20 sm:gap-10 text-white"
              key={item.id}
            >
              <div className="relative mx-auto sm:mx-0">
                <div className="absolute border-2 rounded-full border-white top-0 h-40 w-40 z-10"></div>
                <div className="absolute bg-black rounded-full top-1 left-1 h-[156px] w-[156px] z-20"></div>
                <h3 className="text-7xl font-semibold px-5 pt-12 relative z-50">
                  {item.member}
                  <span className="text-xl font-light"> Members</span>
                </h3>
              </div>
              <div className="relative mx-auto sm:mx-0">
                <div className="absolute border-2 rounded-full border-white top-0 h-40 w-40 z-10"></div>
                <div className="absolute bg-black rounded-full top-1 left-1 h-[156px] w-[156px] z-20"></div>
                <h3 className="text-7xl font-semibold px-5 pt-12 relative z-50">
                  {item.event}
                  <span className="text-xl font-light"> Events</span>
                </h3>
              </div>
              <div className="relative mx-auto sm:mx-0">
                <div className="absolute border-2 rounded-full border-white top-0 h-40 w-40 z-10"></div>
                <div className="absolute bg-black rounded-full top-1 left-1 h-[156px] w-[156px] z-20"></div>
                <h3 className="text-7xl font-semibold px-5 pt-12 relative z-50">
                  {item.achievement}
                  <span className="text-xl font-light"> Achievements</span>
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
