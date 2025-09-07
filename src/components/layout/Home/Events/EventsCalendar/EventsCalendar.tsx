"use client";
import { useState } from "react";
import {
  useHandleFindByEventStartDateQuery,
  useHandleFindUpcomingQuery,
} from "@/Redux/features/event/eventApi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { skipToken } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

import "./calendar-custom.css"; // your overrides

export default function EventsCalendar() {
  const { data: upcomingData, isLoading: upcomingLoading } =
    useHandleFindUpcomingQuery({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatDateToLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = selectedDate ? formatDateToLocal(selectedDate) : null;
  const {
    data: eventData,
    isLoading: eventLoading,
    isError,
  } = useHandleFindByEventStartDateQuery(formattedDate || skipToken);

  const upcomingEvent = upcomingData?.payload || {};
  const findByDateEvent = eventData?.payload || {};

  const handleDateChange = (date: Date) => setSelectedDate(date);

  const countdownRenderer = ({ days, hours }: CountdownRenderProps) => (
    <div className="flex items-center gap-4 text-3xl sm:text-4xl font-bold">
      <div className="flex items-baseline gap-2">
        <span className="text-5xl">{String(days).padStart(2, "0")}</span>
        <span className="text-base font-normal">Days</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl">{String(hours).padStart(2, "0")}</span>
        <span className="text-base font-normal">Hours Left</span>
      </div>
    </div>
  );

  const formatDatePretty = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    return `${getOrdinal(day)} ${month}, ${year}`;
  };

  // Skeleton for countdown
  const CountdownSkeleton = () => (
    <div className="flex items-center gap-4 text-3xl sm:text-4xl font-bold animate-pulse">
      <div className="flex items-baseline gap-2">
        <div className="bg-gray-300 h-16 w-16 rounded"></div>
        <span className="text-base font-normal">Days</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="bg-gray-300 h-16 w-16 rounded"></div>
        <span className="text-base font-normal">Hours Left</span>
      </div>
    </div>
  );

  // Skeleton loader for events
  const SkeletonCard = () => (
    <div className="flex-1 space-y-2">
      <div className="animate-pulse bg-gray-200 rounded h-12 w-full"></div>
      <div className="animate-pulse bg-gray-200 rounded h-12 w-2/3"></div>
    </div>
  );

  const SkeletonEventCard = () => (
    <div className="flex flex-col lg:flex-row gap-5 bg-[#000C3F] py-10 px-[5%] animate-pulse">
      {/* Left section */}
      <div className="flex-1 flex items-center">
        <div className="space-y-4 w-full">
          <div className="h-6 bg-gray-400 rounded w-1/3"></div>
          <div className="h-10 bg-gray-400 rounded w-2/3"></div>
        </div>
      </div>

      {/* Right section (event card) */}
      <div className="border border-[#C4C4C4] bg-white max-w-md w-full">
        {/* Image placeholder */}
        <div className="bg-gray-300 w-full h-60" />

        {/* Text placeholders */}
        <div className="p-5 space-y-2">
          <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>

        <hr className="border-gray-300" />

        {/* Button placeholder */}
        <div className="h-10 bg-gray-300 rounded mx-5 my-3"></div>
      </div>
    </div>
  );

  return (
    <div className="px-[5%] pt-16">
      <div className="max-w-screen-xl mx-auto bg-midnight-navy px-[5%] py-10 space-y-10 text-white">
        <div className="flex flex-col-reverse lg:flex-row gap-5">
          {/* Left side: Upcoming Event */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-xl sm:text-2xl font-normal">Upcoming Events</h1>
            {upcomingLoading ? (
              <SkeletonCard />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-montserrat font-semibold flex-1">
                {upcomingEvent?.title || "No upcoming events"}
              </h1>
            )}

            {upcomingEvent?.eventStartDate &&
              (upcomingLoading ? (
                <CountdownSkeleton />
              ) : (
                <Countdown
                  date={new Date(upcomingEvent.eventStartDate)}
                  renderer={countdownRenderer}
                />
              ))}
          </div>

          {/* Right side: Calendar */}
          <div className="flex flex-col-reverse lg:flex-row gap-5 bg-white text-black p-4">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate} // bind to selectedDate, initially null
              defaultValue={null} // explicitly tell Calendar no default
              tileClassName={({ date }) =>
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
                  ? "react-calendar__tile--active"
                  : ""
              }
            />
          </div>
        </div>

        {/* Selected date event */}
        {isError ? (
          <div className="flex justify-center items-center bg-[#000C3F] text-white py-10 px-6 mt-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">No Events Found</h2>
              <p className="text-gray-300">
                There are no events scheduled for this day. Please check another
                date or stay tuned for upcoming events.
              </p>
            </div>
          </div>
        ) : (
          selectedDate && (
            <>
              {eventLoading ? (
                <SkeletonEventCard />
              ) : (
                <div className="flex flex-col justify-between lg:flex-row gap-5 bg-[#000C3F] py-10 px-[5%]">
                  <div className="flex items-center flex-1">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-normal">
                        Event for
                      </h1>
                      <h1 className="text-2xl sm:text-3xl font-montserrat font-semibold flex-1">
                        {formatDatePretty(findByDateEvent.eventStartDate)}
                      </h1>
                    </div>
                  </div>
                  <div className="border border-[#C4C4C4] bg-white max-w-md">
                    <div className="overflow-hidden">
                      <Image
                        width={300}
                        height={300}
                        src={findByDateEvent.cover}
                        alt={findByDateEvent.title}
                        className="w-full h-60 object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h1 className="flex items-center gap-2 text-sm text-slate-gray font-normal">
                        <CalendarDays size={18} />
                        {new Date(
                          findByDateEvent.eventStartDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </h1>
                      <h3 className="text-xl font-semibold my-2 text-ink-black">
                        {findByDateEvent.title}
                      </h3>
                    </div>
                    <hr />
                    <button className="text-center text-[#2D2D2D] mx-auto my-3 w-full hover:underline">
                      <Link href={`/events/${findByDateEvent.slug}`}>
                        Read More
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
