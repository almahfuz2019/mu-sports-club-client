"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { GiCommercialAirplane } from "react-icons/gi";

const airplanes = [
  { size: 50, color: "text-blue-400", delay: 0, yOffset: -60, duration: 10 },
  { size: 60, color: "text-blue-500", delay: 2, yOffset: -30, duration: 12 },
  { size: 55, color: "text-sky-500", delay: 4, yOffset: 0, duration: 14 },
  { size: 65, color: "text-cyan-600", delay: 6, yOffset: 30, duration: 11 },
  { size: 50, color: "text-blue-600", delay: 8, yOffset: 60, duration: 13 },
  { size: 58, color: "text-sky-600", delay: 10, yOffset: 90, duration: 15 },
  { size: 52, color: "text-blue-300", delay: 12, yOffset: 120, duration: 16 },
];

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-white text-center overflow-hidden">
      {/* Multiple airplanes flying across center screen */}
      {airplanes.map((plane, idx) => (
        <motion.div
          key={idx}
          initial={{ x: "-150vw", y: plane.yOffset }}
          animate={{ x: "150vw" }}
          transition={{
            duration: plane.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: plane.delay,
          }}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 ${plane.color} opacity-50 z-0`}
        >
          <GiCommercialAirplane style={{ fontSize: `${plane.size}px` }} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="z-10 max-w-md">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link href="/">
            <Button variant="default" className="gap-2 cursor-pointer">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
