"use client";
import Image from "next/image";
import { useState } from "react";
import { PaginationGlobal } from "../../Shared/PaginationGlobal/PaginationGlobal";
import { useHandleFindGalleryQuery } from "@/Redux/features/gallery/galleryApi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryImage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError } = useHandleFindGalleryQuery({
    page: currentPage,
    limit: 9,
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

  const openLightbox = (images: string[], index: number) => {
    setActiveImages(images);
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const SkeletonCard = () => (
    <div className="animate-pulse overflow-hidden shadow-md">
      <div className="bg-gray-300 h-48 w-full" />
      <div className="p-3">
        <div className="h-6 bg-gray-300 w-3/4 mb-2" />
      </div>
    </div>
  );

  return (
    <div>
      <div className="px-[5%]">
        <div className="max-w-screen-xl mx-auto">
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
              {allData.map((item: any) => (
                <div
                  key={item._id}
                  className="cursor-pointer"
                  onClick={() => openLightbox(item.image, 0)}
                >
                  <div className="relative">
                    <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-sm">
                      {item.image.length} Photos
                    </div>
                    <Image
                      src={item.image[0]}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-fit shadow"
                    />
                  </div>
                  <h3 className="text-xl font-semibold my-2">{item.title}</h3>
                </div>
              ))}
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <PaginationGlobal
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              className="flex justify-center pt-20"
            />
          )}

          {/* Lightbox */}
          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={activeImages.map((img) => ({ src: img }))}
              index={activeIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
}
