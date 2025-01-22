"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import brand2 from "../assets/brand2.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src={brand2}
              alt="Service-moti logo"
              width={72}
              height={52}
              className="rounded-full"
            />
            <span className="ml-2 text-s font-bold">Service-moti</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white"
              >
                Home
              </a>
              <a
                href="#services"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
              >
                Services
              </a>

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
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Home
            </a>
            <a
              href="#services"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Services
            </a>
            <a
              href="/register"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
            >
              Sign-up
            </a>
            <a
              href="/login"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white bg-red-800"
            >
              Log-in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
