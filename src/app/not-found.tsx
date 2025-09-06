"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  GiSoccerBall,
  GiBasketballBall,
  GiTennisBall,
  GiAmericanFootballBall,
  GiHockey,
} from "react-icons/gi";
import { FaCircle } from "react-icons/fa"; // cricket ball substitute

const sportsBalls = [
  {
    Icon: GiSoccerBall,
    size: 50,
    color: "text-green-500",
    delay: 0,
    yOffset: -60,
    duration: 10,
  },
  {
    Icon: GiBasketballBall,
    size: 60,
    color: "text-orange-500",
    delay: 2,
    yOffset: -30,
    duration: 12,
  },
  {
    Icon: FaCircle, // red cricket ball substitute
    size: 45,
    color: "text-red-600",
    delay: 4,
    yOffset: 0,
    duration: 14,
  },
  {
    Icon: GiTennisBall,
    size: 65,
    color: "text-yellow-400",
    delay: 6,
    yOffset: 30,
    duration: 11,
  },
  {
    Icon: GiAmericanFootballBall,
    size: 50,
    color: "text-brown-600",
    delay: 8,
    yOffset: 60,
    duration: 13,
  },
  {
    Icon: GiHockey,
    size: 58,
    color: "text-blue-600",
    delay: 10,
    yOffset: 90,
    duration: 15,
  },
];

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[var(--color-ghost-white)] to-white text-center overflow-hidden">
      {/* Animated sports balls */}
      {sportsBalls.map((ball, idx) => (
        <motion.div
          key={idx}
          initial={{ x: "-150vw", y: ball.yOffset }}
          animate={{ x: "150vw" }}
          transition={{
            duration: ball.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: ball.delay,
          }}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 ${ball.color} opacity-60 z-0`}
        >
          <ball.Icon style={{ fontSize: `${ball.size}px` }} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="z-10 max-w-md">
        <h1 className="text-9xl font-extrabold text-[var(--color-midnight-navy)] tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-2">
          Oops! Looks like you’re out of bounds. The page you’re looking for
          doesn’t exist.
        </p>

        <div className="mt-6">
          <Link href="/">
            <Button
              variant="default"
              className="gap-2 cursor-pointer bg-[var(--color-crimson-red)] text-white hover:bg-red-700"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
