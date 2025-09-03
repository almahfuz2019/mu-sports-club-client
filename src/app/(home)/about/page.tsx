import React from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import AboutUs from "@/components/layout/Home/About/AboutUs/AboutUs";
import OurSpecialty from "@/components/layout/Home/About/OurSpecialty/OurSpecialty";
import FrequentlyAskedQuestions from "@/components/layout/Home/About/FrequentlyAskedQuestions/FrequentlyAskedQuestions";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <div className="px-[5%]">
        <div className="max-w-screen-xl m-auto py-16 space-y-10">
          <AboutUs />
          <OurSpecialty />
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </div>
  );
}
