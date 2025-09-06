"use client";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { useHandleFindSponsorQuery } from "@/Redux/features/sponsor/sponsorApi";
import Image from "next/image";
import { PaginationGlobal } from "@/components/layout/Home/Shared/PaginationGlobal/PaginationGlobal";
import Link from "next/link";

export default function Sponsor() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useHandleFindSponsorQuery({
    page: currentPage,
    limit: 9,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];
  const totalPages = data?.payload?.pagination?.totalPages || 1;

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="bg-white p-5 sm:p-10 flex flex-col justify-center items-center gap-3 animate-pulse">
      <div className="w-1/2 h-40 bg-gray-300 rounded-md" />
      <div className="h-6 bg-gray-300 rounded w-2/3 mt-3" />
    </div>
  );

  return (
    <div className="bg-ghost-white">
      <Breadcrumb />

      <div className="px-[5%] py-16">
        {isLoading ? (
          <div className="max-w-screen-xl mx-auto  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError || allData.length === 0 ? (
          <div className=" flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold text-midnight-navy mb-2">
              No Sponsors Found
            </h2>
            <p className="text-gray-500 max-w-md">No Sponsors found</p>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5">
            {allData?.map((item: any) => (
              <div
                className="bg-white p-5 sm:p-10 flex flex-col justify-center items-center gap-3"
                key={item._id}
              >
                <Link href={item?.link}>
                  <Image
                    width={300}
                    height={300}
                    src={item?.logo}
                    alt={item?.title}
                    className="w-1/2 h-fit object-cover mx-auto"
                  />
                </Link>
                <h3 className="text-xl font-semibold my-2 text-center">
                  {item.title}
                </h3>
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
  );
}
