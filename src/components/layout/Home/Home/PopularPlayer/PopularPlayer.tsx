"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHandleFindPlayerQuery } from "@/Redux/features/player/playerApi";
import Image from "next/image";

export default function PopularPlayer() {
  const { data, isLoading } = useHandleFindPlayerQuery({
    page: 1,
    limit: 6,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData = data?.payload?.data || [];

  // Skeleton component
  const SkeletonItem = () => (
    <div className="p-1 animate-pulse">
      <div className="bg-slate-200 w-full h-48 rounded-md"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1330px] mx-auto bg-white px-[5%] py-16">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-ink-black text-center mb-10">
        Popular Players
      </h1>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/4"
                >
                  <SkeletonItem />
                </CarouselItem>
              ))
            : allData.slice(0, 5).map((player: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <div className="relative w-full">
                      <Image
                        src={player.image}
                        alt={player.name}
                        width={200}
                        height={200}
                        className="object-cover w-full"
                      />
                      <div className="absolute z-20 bottom-5 right-5">
                        <Image
                          src={player.logo}
                          alt={player.name}
                          width={50}
                          height={50}
                          className="object-cover h-16 w-full"
                        />
                      </div>
                    </div>

                    <div className="text-center mt-2">
                      <h3 className="text-xl font-semibold text-ink-black ">
                        {player.title}
                      </h3>
                      <p className="text-sm text-slate-gray">
                        {player.designation}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
