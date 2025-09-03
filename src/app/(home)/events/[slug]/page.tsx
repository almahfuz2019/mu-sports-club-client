"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHandleFindEventQuery } from "@/Redux/features/event/eventApi";

import Breadcrumb from "./Breadcrumb/Breadcrumb";
import { useHandleFindSingleEventWithPopulateQuery } from "@/Redux/features/event/eventApi";
import { ParamsSlug } from "@/Type/IFields";
import { CalendarDays, Tickets } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import EventCard from "@/components/layout/Home/Shared/Card/EventCard/EventCard";
const Details: React.FC<{ params: Promise<ParamsSlug> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");

  const { data } = useHandleFindSingleEventWithPopulateQuery(slug);
  const { data: event, isLoading } = useHandleFindEventQuery({
    page: 1,
    limit: 6,
    search: "",
    status: "published",
    isTrash: false,
  });

  const allData =
    event?.payload?.data?.filter((item: any) => item?.slug !== slug) || [];

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  return (
    <div className="bg-white">
      <Breadcrumb />
      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className=" flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              {data?.payload?.cover && (
                <Image
                  height={500}
                  width={1000}
                  src={data?.payload?.cover}
                  alt={data?.payload?.title}
                  className="w-full h-fit"
                />
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl montserrat-font font-bold my-5">
                {data?.payload?.title}
              </h1>
              <hr />
              <p
                className="sm:text-lg text-slate-gray my-5"
                dangerouslySetInnerHTML={{ __html: data?.payload?.description }}
              ></p>
            </div>
            <div className="sm:w-72 space-y-5">
              <h1 className="flex items-center gap-2 sm:text-lg text-ink-black font-normal border border-[#C4C4C4] p-3">
                <CalendarDays size={18} />
                Event Start -
                {new Date(data?.payload?.eventStartDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </h1>
              <h1 className="flex items-center gap-2 sm:text-lg text-ink-black font-normal border border-[#C4C4C4] p-3">
                <CalendarDays size={18} />
                Event End -
                {new Date(data?.payload?.eventEndDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </h1>
              <h1 className="flex items-center gap-2 sm:text-lg text-ink-black font-normal border border-[#C4C4C4] p-3">
                <Tickets size={18} />
                Ticket Price - {data?.payload?.ticketPrice}
              </h1>
              <div className="sm:text-lg text-ink-black font-normal border border-[#C4C4C4] p-4 space-y-5">
                <p>Sponsors</p>
                {data?.payload?.sponsor?.map((sp: any) => {
                  return (
                    <div
                      className="bg-ghost-white p-5 flex flex-col justify-center items-center gap-3"
                      key={sp._id}
                    >
                      <Image
                        width={300}
                        height={300}
                        src={sp?.logo}
                        alt={sp?.title}
                        className="w-1/2 h-fit object-cover"
                      />
                      <h3 className="text-xl font-semibold my-2 text-center">
                        {sp.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
              <div className="border border-[#C4C4C4] p-4">
                <h1 className="sm:text-lg text-ink-black font-normal mb-3">
                  Share This Event
                </h1>
                <div className="flex items-center gap-4">
                  <a href="#" className="bg-[#1877F2] p-3 text-white">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="bg-[#1DA1F2] p-3 text-white">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="bg-[#0077B5] p-3 text-white">
                    <FaLinkedinIn size={20} />
                  </a>
                  <a href="#" className="bg-[#E4405F] p-3 text-white">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-ink-black mb-10">
            More Events
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
    </div>
  );
};

export default Details;
