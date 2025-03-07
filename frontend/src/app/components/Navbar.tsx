"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Wrench,
  Users,
  Phone,
  Rocket,
  BookOpen,
} from "lucide-react";
import brand2 from "../assets/brand2.png";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FCE7C8] text-gray-900 shadow-md">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Image
              src={brand2}
              alt="Service-moti logo"
              width={72}
              height={52}
              className="rounded-full"
            />
            <span className="ml-2 text-lg font-bold text-gray-900">
              Service-moti
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-5">
              {[
                { name: "Home", href: "/", icon: Home },
                { name: "Guide", href: "/procedure", icon: BookOpen },
                { name: "Services", href: "#services", icon: Wrench },
                { name: "Contact", href: "#contact", icon: Phone },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-lg font-medium text-gray-800 hover:text-[#F0A04B] transition"
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <Link
                href="/garageonboard"
                className="flex items-center rounded-md bg-[#F0A04B] px-6 py-2 text-lg font-semibold text-white shadow-md hover:bg-[#d28f42] transition"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-[#F0A04B] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FCE7C8] pb-4">
          <div className="space-y-1 px-4">
            {[
              { name: "Home", href: "/", icon: Home },
              { name: "Guide", href: "#procedure", icon: BookOpen },
              { name: "Services", href: "#services", icon: Wrench },
              { name: "Contact", href: "#contact", icon: Phone },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center rounded-md px-3 py-2 text-lg font-medium text-gray-900 hover:bg-[#FADA7A] hover:text-black transition"
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <Link
              href="/garageonboard"
              className="flex items-center rounded-md bg-[#F0A04B] px-6 py-2 text-lg font-semibold text-white shadow-md hover:bg-[#d28f42] transition"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
