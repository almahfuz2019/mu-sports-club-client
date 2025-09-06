import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EventCard({ item }: any) {
  return (
    <div className="border border-[#C4C4C4]">
      <div className="overflow-hidden">
        <Image
          width={300}
          height={300}
          src={item?.cover}
          alt={item?.title}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-5">
        <h1 className="flex items-center gap-2 text-sm text-slate-gray font-normal">
          <CalendarDays size={18} />
          {new Date(item.eventStartDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h1>
        <h3 className="text-xl font-semibold my-2 ">{item.title}</h3>
      </div>
      <hr />
      <button className="text-center text-[#2D2D2D] mx-auto my-3 w-full hover:underline">
        <Link href={`/events/${item?.slug}`}>Read More</Link>
      </button>
    </div>
  );
}
