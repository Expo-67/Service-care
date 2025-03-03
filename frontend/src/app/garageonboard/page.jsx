"use client";
import ImageCard from "../components/ImageCard";
import firstImage from "../assets/account.jpg";
import secondImage from "../assets/cargarage.jpg";
import Image from "next/image";
import brand2 from "../assets/brand2.png";
import { CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react"; //

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
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
        {/* First ImageCard - Create Garage Account */}
        <ImageCard imgSrc={firstImage.src}>
          <h3 className="text-lg font-semibold">Create Garage Account</h3>
          <p className="text-sm text-gray-600">
            Get started with creating an account for your garage.
          </p>
          <div className="mt-10">
            <a
              href="/admin/reggarage"
              className="rounded-md bg-gray-900 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Create Account
            </a>
          </div>
        </ImageCard>

        {/*  Second ImageCard - Login to Garage */}
        <ImageCard imgSrc={secondImage.src}>
          <h3 className="text-lg font-semibold">Login to Garage</h3>
          <p className="text-sm text-gray-600">
            Already have an account for your garage? Log in to manage it.
          </p>
          <div className="mt-10">
            <a
              href="/admin/loggarage"
              className="rounded-md bg-gray-900 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Login to Garage
            </a>
          </div>
        </ImageCard>
      </div>

      {/*  Done Button Aligned to the Right */}
      <div className="w-full flex justify-end mt-10">
        <a
          href="/admin/loggarage"
          className="flex items-center space-x-2 rounded-md bg-gray-950 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          <CheckCircle size={20} />
          <span>Done</span>
        </a>
      </div>
    </main>
  );
}
