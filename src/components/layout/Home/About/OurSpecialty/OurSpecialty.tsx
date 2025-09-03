import { Dot } from "lucide-react";
import React from "react";

export default function OurSpecialty() {
  return (
    <div className="bg-white p-5 sm:p-10 space-y-3">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl montserrat-font font-bold mb-5">
        Our Specialty
      </h1>
      <div className="flex gap-5">
        <Dot size={30} className="w-8 text-slate-gray" />
        <p className="text-slate-gray flex-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </p>
      </div>
      <div className="flex gap-5">
        <Dot size={30} className="w-8 text-slate-gray" />
        <p className="text-slate-gray flex-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </p>
      </div>
      <div className="flex gap-5">
        <Dot size={30} className="w-8 text-slate-gray" />
        <p className="text-slate-gray flex-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </p>
      </div>
    </div>
  );
}
