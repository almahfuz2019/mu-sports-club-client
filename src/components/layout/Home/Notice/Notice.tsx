"use client";
import { useRef, useState } from "react";
import { PaginationGlobal } from "../Shared/PaginationGlobal/PaginationGlobal";

import {
  Dialog,
  DialogContent2,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useHandleFindNoticeQuery } from "@/Redux/features/notice/noticeApi";
import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Notice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useHandleFindNoticeQuery({
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
                No Achievements Found
              </h2>
              <p className="text-gray-500 max-w-md">
                We couldn’t find any achievements for . Please try selecting
                another year.
              </p>
            </div>
          ) : (
            <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData?.map((item: any) => (
                <div className="bg-white p-5 shadow" key={item?._id}>
                  <div className="flex gap-5">
                    <Megaphone
                      size={50}
                      className="text-white bg-midnight-navy rounded-full p-[10px] inline w-12 h-12 mt-2 -rotate-45"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold my-2">
                        {item.title}
                      </h3>
                      <p className="text-sm flex items-center gap-2 text-slate-gray">
                        <CalendarDays
                          size={18}
                          className="text-slate-gray inline mr-1"
                        />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <h3
                    className="text-sm font-normal text-slate-gray my-5"
                    dangerouslySetInnerHTML={{
                      __html: item.description?.slice(0, 200) + "...",
                    }}
                  />
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <button className="border text-base bg-midnight-navy text-white border-midnight-navy px-5 py-1 hover:bg-transparent hover:text-midnight-navy transition cursor-pointer w-fit flex items-center gap-1">
                          Read More
                          <ArrowRight size={16} className="mt-1" />
                        </button>
                      </DialogTrigger>
                      <DialogContent2 className="sm:max-w-[600px] p-0 border-0 max-h-[90vh] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle className="bg-midnight-navy text-start text-white p-5">
                            Notice
                          </DialogTitle>
                          <DialogDescription className="p-5">
                            <h3 className="text-2xl font-semibold my-2 text-ink-black">
                              {item.title}
                            </h3>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                            <h3
                              className="text-sm font-normal my-5"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                            <Link
                              href={item?.link}
                              target="_blank"
                              className="text-blue-600 text-lg hover:underline"
                            >
                              View
                            </Link>
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
