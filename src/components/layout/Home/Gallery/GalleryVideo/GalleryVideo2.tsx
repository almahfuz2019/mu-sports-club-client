"use client";
import { useState } from "react";
import { PaginationGlobal } from "../../Shared/PaginationGlobal/PaginationGlobal";
import { useHandleFindVideoQuery } from "@/Redux/features/video/videoApi";

export default function GalleryVideo() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useHandleFindVideoQuery({
    page: currentPage,
    limit: 12,
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
    <div className="animate-pulse space-y-3">
      <div className="bg-gray-300 h-52 w-full" />
    </div>
  );

  // ✅ Helper function to render YouTube or Facebook iframe
  const renderVideo = (url: string) => {
    if (!url) return null;

    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width="100%"
          height="250"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // Facebook
    if (url.includes("facebook.com")) {
      return (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
            url
          )}&show_text=false&width=500`}
          width="100%"
          height="250"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    return <p className="text-red-500 text-center">Unsupported video format</p>;
  };

  return (
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
              No Videos Found
            </h2>
            <p className="text-gray-500 max-w-md">
              We couldn’t find any videos. Please try selecting another page.
            </p>
          </div>
        ) : (
          <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allData?.map((item: any) => (
              <div
                key={item?._id}
                className="rounded-lg overflow-hidden shadow bg-white"
              >
                {renderVideo(item?.link)}
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
