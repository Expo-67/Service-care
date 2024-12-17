"use client";
import Image from "next/image";
//import Link from "next/link";
import gti from "../assets/gti.jpeg";
import { useState } from "react";

const Navbar = () => {
  // State to track whether the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo and Header */}
            <div className="flex items-center">
              <Image className="h-8 w-auto" src={gti} alt="gti" />
            </div>

            {/* Centered Home Link */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-4 content-center justify-center">
                <a
                  href="#"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </div>
            </div>

            {/* Right-side Links (Sign-up, Log-in) */}
            <div className="hidden sm:flex space-x-4 content-center">
              <a
                href="./Register"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              >
                Sign-up
              </a>

              <a
                href="./login"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              >
                Log-in
              </a>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon (when menu is closed) */}
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} block size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* Close icon (when menu is open) */}
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Home
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Sign-up
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Log-in
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
