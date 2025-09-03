"use client";
import { useState } from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { useHandleFindAllCommitteeQuery } from "@/Redux/features/allCommittee/allCommittee";
import { PaginationGlobal } from "@/components/layout/Home/Shared/PaginationGlobal/PaginationGlobal";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function Member() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useHandleFindAllCommitteeQuery({
    page: currentPage,
    limit: 6,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];
  const totalPages = data?.payload?.pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Skeleton component for loading state
  const SkeletonMemberCard = () => (
    <div className="border-t border-ink-black py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 sm:mr-24 mb-10 sm:mb-8">
        <div className="h-8 sm:h-10 lg:h-12 w-1/2 bg-gray-300 rounded" />
        <div className="h-8 w-32 bg-gray-300 rounded" />
      </div>

      {/* Carousel skeleton */}
      <div className="flex gap-5 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 w-[33%] h-48 sm:h-64 md:h-72 lg:h-80 rounded"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto">
          {/* Loading State */}
          {isLoading ? (
            <div className="pt-20">
              {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonMemberCard key={i} />
              ))}
            </div>
          ) : isError || allData.length === 0 ? (
            // Empty/Error State
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-midnight-navy mb-2">
                No Members Found
              </h2>
              <p className="text-gray-500 max-w-md">
                We couldn’t find any Members for this selection.
              </p>
            </div>
          ) : (
            // Actual Data
            <div className="pt-20">
              {allData.map((item: any) => (
                <div
                  className="border-t border-ink-black py-10"
                  key={item?._id}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 sm:mr-24 mb-10 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat">
                      Committee member-{item?.year}
                    </h1>
                    <Link
                      href={`/members/${item?.slug}`}
                      className="border bg-midnight-navy text-white border-midnight-navy font-semibold px-3 sm:px-10 py-1 sm:py-3 hover:bg-transparent hover:text-midnight-navy transition cursor-pointer w-fit"
                    >
                      Explore All
                    </Link>
                  </div>

                  {/* Carousel */}
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {item?.image.map((img: any, index: number) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <Image
                            src={img}
                            alt={item?.title}
                            width={500}
                            height={300}
                            className="object-cover w-full h-fit"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
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
