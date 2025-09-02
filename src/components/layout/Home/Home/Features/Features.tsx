import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <div className="px-[5%] py-16">
      <div className="max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="relative">
          <Image
            src="/images/Practice.png"
            alt="Feature 1"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 w-full h-full bg-midnight-navy/75 p-5">
            <div className="border border-white/75 flex justify-center items-center text-center h-full">
              <span className="text-white text-2xl font-medium">Practice</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/Networking.png"
            alt="Feature 1"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 w-full h-full bg-crimson-red/50 p-5">
            <div className="border border-white/75 flex justify-center items-center text-center h-full">
              <span className="text-white text-2xl font-medium">
                Networking
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/Competitions.png"
            alt="Feature 1"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 w-full h-full bg-midnight-navy/75 p-5">
            <div className="border border-white/75 flex justify-center items-center text-center h-full">
              <span className="text-white text-2xl font-medium">
                Competitions
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/Events.png"
            alt="Feature 1"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 w-full h-full bg-crimson-red/50 p-5">
            <div className="border border-white/75 flex justify-center items-center text-center h-full">
              <span className="text-white text-2xl font-medium">Events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
