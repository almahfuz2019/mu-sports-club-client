import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-white p-5 sm:p-10 flex flex-col sm:flex-row gap-5">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={250}
        height={250}
        className="h-fit w-full sm:w-72 lg:w-80 mx-auto"
      />
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl montserrat-font font-bold mb-5">
          About Us
        </h1>
        <p className="sm:text-lg text-slate-gray">
          Established in 2006, MU Sports Club is the largest and most active
          student organization at Metropolitan University. Built on the passion
          for sports and gaming, the club works to create a culture of energy,
          excitement, and unity through both indoor and outdoor activities.
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          Over the years, MU Sports Club has grown into the hub of competitive
          and recreational sports on campus. From major tournaments to casual
          matches, we provide a platform where talent meets opportunity, and
          every player gets the chance to shine.
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          Our flagship events include:
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          UPL – University Premier League
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          MPL – Metropolitan Premier League
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          CLC – Cricket League for Colleges
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">
          League M – League Metropolitan
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">MU Indoor Tournament</p>{" "}
        <p className="sm:text-lg text-slate-gray">
          MU Futsal & Intra-MUSC Futsal Tournament
        </p>{" "}
        <p className="sm:text-lg text-slate-gray">MU Badminton Tournaments</p>{" "}
        <p className="sm:text-lg text-slate-gray">
          At MU Sports Club, we believe sports are more than just games—they
          build character, teamwork, and lifelong memories. With every event we
          organize, we aim to carry forward the true essence of sportsmanship at
          Metropolitan University.
        </p>
      </div>
    </div>
  );
}
