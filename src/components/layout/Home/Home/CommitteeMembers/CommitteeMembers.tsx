"use client";

import { useHandleFindCommitteeQuery } from "@/Redux/features/committee/committeeApi";
import Image from "next/image";

export default function CommitteeMembers() {
  const { data, isLoading } = useHandleFindCommitteeQuery({
    page: 1,
    limit: 20,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  return (
    <div className="bg-onyx-black px-[5%] py-16 text-white">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-center mb-10">
          Committee Members
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading
            ? // Skeleton loaders
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-charcoal-gray p-5 text-center animate-pulse"
                >
                  <div className="w-full h-60 bg-gray-700 rounded-md"></div>
                  <div className="h-5 bg-gray-600 rounded mt-4 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-600 rounded mt-2 w-1/2 mx-auto"></div>
                </div>
              ))
            : // Actual data
              allData?.map((item: any) => (
                <div
                  className="bg-charcoal-gray p-5 text-center"
                  key={item?._id}
                >
                  <Image
                    width={300}
                    height={500}
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-fit"
                  />
                  <h3 className="text-xl font-semibold my-2">{item.title}</h3>
                  <p className="text-sm">{item.designation}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
