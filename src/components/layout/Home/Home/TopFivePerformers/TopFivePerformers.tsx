"use client";

import { useHandleFindPerformerQuery } from "@/Redux/features/performer/performerApi";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopFivePerformers() {
  const { data, isLoading } = useHandleFindPerformerQuery({
    page: 1,
    limit: 5,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  return (
    <div className="px-[5%] py-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-ink-black mb-10">
            Top Five Performers
          </h1>
          <p className="sm:text-lg text-slate-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-3 flex-1">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-ghost-white px-5 sm:px-10 py-5 flex gap-3 sm:gap-10 lg:gap-20"
                >
                  <h1 className="my-auto text-6xl sm:text-8xl lg:text-9xl text-ink-black/15">
                    {i + 1}
                  </h1>
                  <Skeleton className="rounded-full h-20 w-20 sm:h-32 sm:w-32 my-auto" />
                  <div className="space-y-2 flex-1 my-auto">
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-5 w-3/5" />
                    <Skeleton className="h-5 w-2/4" />
                  </div>
                </div>
              ))
            : allData.map((item: any, i: number) => (
                <div
                  key={item._id}
                  className="bg-ghost-white px-5 sm:px-10 py-5 flex gap-3 sm:gap-10 lg:gap-20"
                >
                  <h1 className="my-auto text-6xl sm:text-8xl lg:text-9xl text-ink-black/15">
                    {i + 1}
                  </h1>
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.title}
                    className="rounded-full h-20 w-20 sm:h-32 sm:w-32 object-cover my-auto"
                  />
                  <div>
                    <h1 className="text-base sm:text-lg text-ink-black font-medium">
                      <span className="text-slate-gray font-normal">
                        Name -{" "}
                      </span>{" "}
                      {item.title}
                    </h1>
                    <h1 className="text-base sm:text-lg text-ink-black font-medium">
                      <span className="text-slate-gray font-normal">
                        Team -{" "}
                      </span>{" "}
                      {item.team}
                    </h1>
                    <h1 className="text-base sm:text-lg text-ink-black font-medium">
                      <span className="text-slate-gray font-normal">
                        Position -{" "}
                      </span>{" "}
                      {item.position}
                    </h1>
                    <h1 className="text-base sm:text-lg text-ink-black font-medium">
                      <span className="text-slate-gray font-normal">
                        Points -{" "}
                      </span>{" "}
                      {item.point}
                    </h1>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
