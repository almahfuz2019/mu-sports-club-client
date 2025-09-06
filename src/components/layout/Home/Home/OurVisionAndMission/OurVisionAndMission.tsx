import { Dot } from "lucide-react";

export default function OurVisionAndMission() {
  return (
    <div className="relative mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 absolute top-0 -z-10 w-full h-full">
        <div className="bg-midnight-navy w-full h-full"></div>
        <div className="bg-crimson-red w-full h-full"></div>
      </div>
      <div className=" px-[5%]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-20">
          <div className="py-10 lg:py-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-white mb-10">
              Our Vision
            </h1>
            <p className="text-white ">
              To create a thriving community where sports and gaming go beyond
              competition shaping character, building unity, and inspiring
              future leaders. We envision MU Sports Club as a platform that
              empowers every student to embrace teamwork, discipline, and
              healthy living, while representing Metropolitan University with
              pride at local, national, and global levels.
            </p>
          </div>
          <div className="py-10 lg:py-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-white mb-10">
              Our Mission
            </h1>
            <div className="text-white ">
              <div className="flex gap-1">
                <Dot size={25} className="w-10" />
                <p className="flex-1">
                  To promote a vibrant sporting culture at Metropolitan
                  University through diverse indoor and outdoor activities.
                </p>
              </div>
              <div className="flex gap-1">
                <Dot size={25} className="w-10" />
                <p className="flex-1">
                  To organize professional, competitive, and recreational
                  tournaments that bring together students, athletes, and sports
                  enthusiasts.
                </p>
              </div>
              <div className="flex gap-1">
                <Dot size={25} className="w-10" />
                <p className="flex-1">
                  To nurture talent, discipline, and teamwork while encouraging
                  healthy lifestyles and lifelong friendships.
                </p>
              </div>
              <div className="flex gap-1">
                <Dot size={25} className="w-10" />
                <p className="flex-1">
                  To build a strong platform that represents Metropolitan
                  University with pride in both local and national sporting
                  arenas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
