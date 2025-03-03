"use client";
import ImageCard from "../components/ImageCard";
import firstImage from "../assets/hero.jpg";
import secondImage from "../assets/logserv2.jpg";
import Image from "next/image";
import brand2 from "../assets/brand2.png";
import { ArrowLeft } from "lucide-react";
import { CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-white/90 to-gray-800">
      {/*  Centered Header with Logo */}
      <div className="flex items-center justify-center space-x-2">
        <CardTitle className="text-2xl font-bold">Service-Moti</CardTitle>
        <Image
          src={brand2}
          alt="Service-Moti logo"
          width={72}
          height={62}
          className="rounded-full"
        />
      </div>

      {/*  Centered Grid for Image Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* First ImageCard - Register clients */}
        <ImageCard imgSrc={firstImage.src}>
          <h3 className="text-lg font-semibold">Register Client Account </h3>
          <p className="text-sm text-white">
            Get started with creating an account for your clients to record
            there service history in your Garage.
          </p>
          <div className="mt-10">
            <a
              href="/Register"
              className="rounded-md bg-gray-900 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Register Account
            </a>
          </div>
        </ImageCard>

        {/*  Second ImageCard - Login to client */}
        <ImageCard imgSrc={secondImage.src}>
          <h3 className="text-lg font-semibold">Login Clients Service</h3>
          <p className="text-sm text-white/90">
            Log in to your clients account and record the service history of
            your clients in your Garage.
          </p>
          <div className="mt-10">
            <a
              href="/login"
              className="rounded-md bg-gray-900 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Login to Account
            </a>
          </div>
        </ImageCard>
      </div>
      {/*  Done Button Aligned to the Right */}
      <div className="w-full flex justify-end mt-10">
        <a
          href="/garageonboard"
          className="flex items-center space-x-2 rounded-md bg-gray-950 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </a>
      </div>
    </main>
  );
}
