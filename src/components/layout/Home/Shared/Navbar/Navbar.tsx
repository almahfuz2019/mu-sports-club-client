"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/achievements", label: "Achievements" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/members", label: "Members" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/notice", label: "Notice" },
  ];

  return (
    <nav className="px-[5%] bg-white py-5 shadow-sm relative z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="h-20 w-fit relative z-50"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-lg transition-colors ${
                    isActive
                      ? "text-midnight-navy"
                      : "text-ink-black hover:text-midnight-navy"
                  }`}
                >
                  {link.label}
                  {/* Creative hover underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-midnight-navy transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Be Sponsor button */}
            <Link
              href="/be-sponsor"
              className="bg-midnight-navy text-white font-semibold px-4 py-2 rounded hover:bg-blue-950 transition"
            >
              Be Sponsor
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none relative z-50"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu with Animation */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 z-40 transform transition-all duration-500 ease-in-out lg:hidden ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on click
              className={`relative text-xl transition-colors ${
                isActive
                  ? "text-midnight-navy"
                  : "text-gray-800 hover:text-midnight-navy"
              }`}
            >
              {link.label}
              {/* Hover underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-midnight-navy transition-transform duration-300 ease-out hover:scale-x-100" />
            </Link>
          );
        })}

        <Link
          href="/be-sponsor"
          onClick={() => setIsOpen(false)}
          className="bg-midnight-navy text-white font-semibold px-6 py-3 rounded text-lg hover:bg-blue-950 transition"
        >
          Be Sponsor
        </Link>
      </div>
    </nav>
  );
}
