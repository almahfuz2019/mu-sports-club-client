"use client";
import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent2,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaginationGlobal } from "../../Shared/PaginationGlobal/PaginationGlobal";
import { useHandleFindGalleryQuery } from "@/Redux/features/gallery/galleryApi";

export default function GalleryImage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useHandleFindGalleryQuery({
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

  // Fixed Skeleton component (mimics gallery card)
  const SkeletonCard = () => (
    <div className="animate-pulse overflow-hidden shadow-md">
      {/* Image placeholder */}
      <div className="bg-gray-300 h-48 w-full" />
      {/* Title placeholder */}
      <div className="p-3">
        <div className="h-6 bg-gray-300 w-3/4 mb-2" />
      </div>
    </div>
  );

  return (
    <div>
      <div className="px-[5%]">
        <div className="max-w-screen-xl mx-auto">
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
                No Gallery Images Found
              </h2>
              <p>Please try selecting another category or year.</p>
            </div>
          ) : (
            <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData?.map((item: any) => (
                <div className="" key={item?._id}>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer">
                          <div className="relative">
                            <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-sm">
                              {item?.image?.length} Photos
                            </div>
                            <Image
                              src={item?.image[0]}
                              alt={item?.title}
                              width={500}
                              height={300}
                              className="object-cover w-full h-fit shadow"
                            />
                          </div>
                          <h3 className="text-xl font-semibold my-2 cursor-pointer">
                            {item.title}
                          </h3>
                        </div>
                      </DialogTrigger>
                      <DialogContent2 className="sm:max-w-[600px] p-0 border-0 max-h-[90vh] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle className="bg-midnight-navy text-start text-white p-5 pr-8">
                            {item.title}
                          </DialogTitle>
                          <DialogDescription className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {item?.image?.map((img: any, index: number) => (
                              <Image
                                key={index}
                                src={img}
                                alt={item?.title}
                                width={500}
                                height={300}
                                className="object-cover w-full h-fit"
                              />
                            ))}
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
