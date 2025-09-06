"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { PaginationGlobal } from "../../Shared/PaginationGlobal/PaginationGlobal";
import EventCard from "../../Shared/Card/EventCard/EventCard";
import { useHandleFindEventQuery } from "@/Redux/features/event/eventApi";

export default function EventsCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useHandleFindEventQuery({
    page: currentPage,
    limit: 9,
    search: searchText,
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];
  const totalPages = data?.payload?.pagination?.totalPages || 1;

  const handleSearch = async () => {
    const trimmed = searchRef.current?.value.trim() || "";
    setSearchText(trimmed);
    setCurrentPage(1);
  };

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
          <div className="flex flex-wrap justify-center items-center gap-5">
            <div className="flex items-center justify-center">
              <Input
                ref={searchRef}
                placeholder="Search here..."
                className="bg-white"
              />
              <button
                className="border text-base bg-midnight-navy text-white border-midnight-navy px-5 py-1 hover:bg-transparent hover:text-midnight-navy transition cursor-pointer"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
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
                No Events Found
              </h2>
              <p className="text-gray-500 max-w-md">
                We couldn’t find any Events for . Please try selecting
                another year.
              </p>
            </div>
          ) : (
            <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData?.map((item: any) => (
                <EventCard key={item?._id} item={item} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && !isError && (
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
