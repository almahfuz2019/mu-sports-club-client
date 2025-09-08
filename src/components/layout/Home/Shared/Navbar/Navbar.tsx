"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useGetCurrentUserQuery } from "@/Redux/features/auth/authApi";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isActive = (path: string) => pathname === path;
  const { data } = useGetCurrentUserQuery();

  return (
    <nav className="bg-white text-dark">
      <div className="px-[5%] bg-white relative z-50">
        <div className="max-w-screen-xl mx-auto py-3.5 flex justify-between items-center">
          <div className="relative z-50">
            <Link href="/">
              <Image
                width={500}
                height={200}
                src="/images/logo.svg"
                alt="logo"
                className="h-12 md:h-14 w-fit"
              />
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={`hover:underline ${
                isActive("/")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Home
            </Link>
            <Link
              href="/achievements"
              className={`hover:underline ${
                isActive("/achievements")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Achievements
            </Link>
            <Link
              href="/about"
              className={`hover:underline ${
                isActive("/about")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              About
            </Link>
            <Link
              href="/events"
              className={`hover:underline ${
                isActive("/events")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className={`hover:underline ${
                isActive("/gallery")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/members"
              className={`hover:underline ${
                isActive("/members")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Members
            </Link>
            <Link
              href="/sponsors"
              className={`hover:underline ${
                isActive("/sponsors")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Sponsors
            </Link>
            <Link
              href="/notice"
              className={`hover:underline ${
                isActive("/notice")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Notice
            </Link>

            {data?.payload?.role === "admin" && (
              <Link
                href="/dashboard"
                className={`hover:underline ${
                  isActive("/dashboard")
                    ? "text-midnight-navy"
                    : "text-ink-black hover:text-midnight-navy"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/#be-sponsors"
              className="bg-midnight-navy text-white font-semibold px-4 py-2 hover:bg-blue-950 transition"
            >
              Be Sponsor
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={toggleMobileMenu}
              className="text-2xl focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white transform z-40 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-500 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col space-y-4 py-6 px-4">
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/"
            className={`hover:underline px-2 ${
              isActive("/")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Home
          </Link>

          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/achievements"
            className={`hover:underline px-2 ${
              isActive("/achievements")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Achievements
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/about"
            className={`hover:underline px-2 ${
              isActive("/about")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            About
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/about"
            className={`hover:underline px-2 ${
              isActive("/about")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            About
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/events"
            className={`hover:underline px-2 ${
              isActive("/events")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Events
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/gallery"
            className={`hover:underline px-2 ${
              isActive("/gallery")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Gallery
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/members"
            className={`hover:underline px-2 ${
              isActive("/members")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Members
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/sponsors"
            className={`hover:underline px-2 ${
              isActive("/sponsors")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Sponsors
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/notice"
            className={`hover:underline px-2 ${
              isActive("/notice")
                ? "text-midnight-navy"
                : "text-ink-black hover:text-midnight-navy"
            }`}
          >
            Notice
          </Link>

          {data?.payload?.role === "admin" && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/dashboard"
              className={`hover:underline px-2 ${
                isActive("/dashboard")
                  ? "text-midnight-navy"
                  : "text-ink-black hover:text-midnight-navy"
              }`}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/#be-sponsors"
            className="bg-midnight-navy text-white font-semibold px-4 py-2 hover:bg-blue-950 transition"
          >
            Be Sponsor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
