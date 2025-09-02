import Banner from "@/components/layout/Home/Home/Banner/Banner";
import BeOurSponsor from "@/components/layout/Home/Home/BeOurSponsor/BeOurSponsor";
import CommitteeMembers from "@/components/layout/Home/Home/CommitteeMembers/CommitteeMembers";
import Features from "@/components/layout/Home/Home/Features/Features";
import FeaturesEvents from "@/components/layout/Home/Home/FeaturesEvents/FeaturesEvents";
import OurVisionAndMission from "@/components/layout/Home/Home/OurVisionAndMission/OurVisionAndMission";
import PopularPlayer from "@/components/layout/Home/Home/PopularPlayer/PopularPlayer";
import Stats from "@/components/layout/Home/Home/Stats/Stats";
import TopFivePerformers from "@/components/layout/Home/Home/TopFivePerformers/TopFivePerformers";
import React from "react";

export default function page() {
  return (
    <div>
      <div
        className="relative w-full"
        style={{
          backgroundImage: "url('/images/banner-bg.png')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Semi-transparent gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--gradient-navy-crimson)",
            opacity: 0.9,
          }}
        ></div>

        {/* Content */}
        <div className="relative px-[5%]">
          <Banner />
          <PopularPlayer />
        </div>
      </div>
      <OurVisionAndMission />
      <CommitteeMembers />
      <FeaturesEvents />
      <Features />
      <TopFivePerformers />
      <Stats />
      <BeOurSponsor />
    </div>
  );
}
