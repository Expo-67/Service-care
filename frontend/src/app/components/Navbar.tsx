"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, Home, Wrench, Users, Phone, Rocket } from "lucide-react"; // Import icons
import brand2 from "../assets/brand2.png";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-17 items-center justify-between">
          <div className="flex items-center">
            <Image
              src={brand2}
              alt="Service-moti logo"
              width={72}
              height={52}
              className="rounded-full"
            />
            <span className="ml-2 text-s font-bold text-black">
              Service-moti
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              <Link
                href="#services"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Services
              </Link>
              <Link
                href="#aboutus"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
              >
                <Users className="mr-2 h-4 w-4" />
                About Us
              </Link>
              <Link
                href="#contact"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </Link>
              <div className="mt-10">
                <Link
                  href="/garageonboard"
                  className="flex items-center rounded-md bg-gray-900 px-6 py-2 font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
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
            <Link
              href="/"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-black"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link
              href="#services"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-black"
            >
              <Wrench className="mr-2 h-4 w-4" />
              Services
            </Link>
            <Link
              href="#aboutus"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-black"
            >
              <Users className="mr-2 h-4 w-4" />
              About Us
            </Link>
            <Link
              href="#contact"
              className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100 hover:text-black"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </Link>
            <Link
              href="/garageonboard"
              className="flex items-center rounded-md bg-gray-900 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
