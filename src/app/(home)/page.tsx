import Banner from "@/components/layout/Home/Home/Banner/Banner";
import OurVisionAndMission from "@/components/layout/Home/Home/OurVisionAndMission/OurVisionAndMission";
import PopularPlayer from "@/components/layout/Home/Home/PopularPlayer/PopularPlayer";
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
    </div>
  );
}
