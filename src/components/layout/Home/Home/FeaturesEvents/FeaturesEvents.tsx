"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHandleFindEventQuery } from "@/Redux/features/event/eventApi";
import EventCard from "../../Shared/Card/EventCard/EventCard";

export default function FeaturesEvents() {
  const { data, isLoading } = useHandleFindEventQuery({
    page: 1,
    limit: 8,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  return (
    <div className="px-[5%] bg-ghost-white">
      <div className="max-w-screen-xl mx-auto py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-ink-black mb-10">
          Features Events
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    {/* Skeleton card */}
                    <div className="border border-[#C4C4C4] animate-pulse">
                      <div className="w-full h-48 bg-gray-300"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-5 bg-gray-300 rounded w-full"></div>
                        <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                      </div>
                      <hr />
                      <div className="h-5 bg-gray-300 rounded mx-auto my-5 w-1/3"></div>
                    </div>
                  </CarouselItem>
                ))
              : allData.map((item: any) => (
                  <CarouselItem
                    key={item?._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <EventCard item={item} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
