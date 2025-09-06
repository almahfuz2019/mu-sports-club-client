"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-[5%] pt-10 pb-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-9 gap-10">
        {/* Left - Logo & Contact */}
        <div className="flex flex-col lg:flex-row items-center gap-4 text-center md:text-left md:col-span-4">
          <Image
            src="/images/logo2.svg"
            alt="Logo"
            width={120}
            height={120}
            className="w-52 h-auto"
          />

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
              <p className="text-sm leading-relaxed flex-1">
                Metropolitan University, Bateshwar, Sylhet, Bangladesh, 3104
              </p>
            </div>

            <div className="flex text-start gap-2">
              <Mail className="w-5 h-5 text-white" />
              <p className="text-sm flex-1">Loremipsum@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Divider (only desktop) */}
        <div className="hidden md:block w-px bg-gray-700 mx-auto"></div>

        {/* Right - Links */}
        <div className="flex flex-col md:flex-row justify-center md:justify-around gap-8 text-center md:text-left md:col-span-4">
          <ul className="space-y-3">
            <li>
              <Link href="/achievements" className="hover:text-white">
                Achievements
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white">
                Gallery
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <li>
              <Link href="/members" className="hover:text-white">
                Members
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:text-white">
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/notice" className="hover:text-white">
                Notice
              </Link>
            </li>
            <li>
              <button className="hover:text-white">Terms & Conditions</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center max-w-screen-xl mx-auto gap-5">
        <p>
          <Link
            href="https://metrouni.edu.bd/"
            target="_blank"
            className="text-white font-semibold"
          >
            © Metropolitan University {new Date().getFullYear()}
          </Link>
        </p>
        <p>
          Designed and Developed By{" "}
          <Link
            href={"https://www.qrinux.com/"}
            target="_blank"
            className="text-white font-semibold"
          >
            Qrinux
          </Link>
        </p>
      </div>
    </footer>
  );
}
