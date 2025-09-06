"use client";

import { useHandleFindEventQuery } from "@/Redux/features/event/eventApi";
import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Banner() {
  const { data, isLoading } = useHandleFindEventQuery({
    page: 1,
    limit: 5,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto py-10">
        <div className="w-full h-72 sm:h-96 lg:h-[500px] bg-gray-200 animate-pulse rounded-md relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-400 via-gray-300 to-transparent p-5 flex flex-col justify-end">
            <div className="space-y-3 max-w-xl">
              <div className="flex gap-2">
                <div className="w-24 h-6 bg-gray-300 rounded"></div>
                <div className="w-32 h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 sm:h-12 lg:h-14 bg-gray-300 rounded w-3/4"></div>
              <div className="w-28 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <Carousel className="w-full">
        <CarouselContent>
          {allData.map((event: any, index: number) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-72 sm:h-96 lg:h-[500px] border border-white">
                {event?.cover && (
                  <Image
                    height={500}
                    width={1000}
                    src={event.cover}
                    alt={event.title || "Event cover"}
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="absolute z-20 bg-[linear-gradient(78.53deg,rgba(26,26,26,0.8)12.82%,rgba(26,26,26,0)100%)] inset-0 flex flex-col justify-end p-5 lg:p-10 ">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-midnight-navy text-sm text-white px-4 py-2 hover:bg-blue-950 transition rounded-full">
                        {event?.eventEndDate
                          ? new Date(event.eventEndDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </button>

                      <button className="bg-midnight-navy text-sm text-white px-4 py-2 hover:bg-blue-950 transition rounded-full">
                        {event?.category?.title}
                      </button>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white my-3 montserrat-font">
                      {event?.title}
                    </h1>
                    <Link
                      href={`/events/${event?.slug}`}
                      className="bg-crimson-red text-sm text-white px-4 py-2 hover:bg-red-600 transition flex gap-2 w-fit cursor-pointer"
                    >
                      Details{" "}
                      <MoveLeftIcon className="rotate-180 mt-[2px]" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
