"use client";

import { useHandleFindAchievementQuery } from "@/Redux/features/achievement/achievementApi";
import Image from "next/image";
import { useState } from "react";
import { PaginationGlobal } from "../Shared/PaginationGlobal/PaginationGlobal";

import {
  Dialog,
  DialogContent2,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Achievements() {
  const currentYear = new Date().getFullYear();
  // "Recent" replaces current year → we only keep numbers in the list
  const years = [
    currentYear,
    ...Array.from({ length: 8 }, (_, i) => currentYear - 1 - i),
  ];

  // Default state is currentYear (which is shown as "Recent" in UI)
  const [year, setYear] = useState<number>(currentYear);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useHandleFindAchievementQuery({
    page: currentPage,
    limit: 12,
    search: "",
    status: "published",
    isTrash: false,
    year,
  });

  const allData = data?.payload?.data || [];
  const totalPages = data?.payload?.pagination?.totalPages || 1;

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Skeleton component
  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4" />
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-300 rounded mb-1 w-full" />
      <div className="h-4 bg-gray-300 rounded mb-1 w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mt-3" />
    </div>
  );

  return (
    <div>
      <div className="px-[5%] py-20">
        <div className="max-w-screen-xl mx-auto">
          {/* Year Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-5">
            {years.map((y, idx) => (
              <button
                key={y}
                onClick={() => {
                  setYear(y);
                  setCurrentPage(1); // reset page when year changes
                }}
                className={`${
                  year !== y
                    ? "bg-transparent text-midnight-navy"
                    : "bg-midnight-navy text-white"
                } border border-midnight-navy font-semibold px-3 sm:px-10 py-1 sm:py-3 hover:bg-transparent hover:text-midnight-navy transition cursor-pointer`}
              >
                {idx === 0 ? "Recent" : y}
              </button>
            ))}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError || allData.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-midnight-navy mb-2">
                No Achievements Found
              </h2>
              <p className="text-gray-500 max-w-md">
                We couldn’t find any achievements for{" "}
                <span className="font-medium">
                  {year === currentYear ? "Recent" : year}
                </span>
                . Please try selecting another year.
              </p>
            </div>
          ) : (
            <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData?.map((item: any) => (
                <div className="" key={item?._id}>
                  <div className="relative">
                    <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1">
                      {item?.year}
                    </div>
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-fit"
                    />
                  </div>
                  <h3 className="text-xl font-semibold my-2 ">{item.title}</h3>
                  <h3
                    className="text-sm font-normal  text-slate-gray"
                    dangerouslySetInnerHTML={{
                      __html: item.description?.slice(0, 200) + "...",
                    }}
                  />
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <button className="text-ocean-blue text-start mx-auto my-5 w-full cursor-pointer hover:underline">
                          Read More
                        </button>
                      </DialogTrigger>
                      <DialogContent2 className="sm:max-w-[600px] p-0 border-0 max-h-[90vh] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle className="bg-midnight-navy text-start text-white p-5">
                            Achievement {item?.year}
                          </DialogTitle>
                          <DialogDescription className="p-5">
                            <Image
                              src={item?.image}
                              alt={item?.title}
                              width={500}
                              height={300}
                              className="object-cover w-full h-fit"
                            />
                            <h3 className="text-xl font-semibold my-2 ">
                              {item.title}
                            </h3>
                            <h3
                              className="text-sm font-normal"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent2>
                    </form>
                  </Dialog>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <PaginationGlobal
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              className="flex justify-center pt-20"
            />
          )}
        </div>
      </div>
    </div>
  );
}
