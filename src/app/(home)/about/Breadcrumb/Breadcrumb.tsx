import React from "react";

export default function Breadcrumb() {
  return (
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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold font-montserrat text-white py-16 sm:py-20">
          About
        </h1>
      </div>
    </div>
  );
}
