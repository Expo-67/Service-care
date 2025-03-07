import React from "react";
import Image from "next/image";
import { UserPlus, LogIn, ClipboardList, Bell, Rocket } from "lucide-react"; // Added Rocket icon
import garageImg from "../assets/garage.jpg";
import clientImg from "../assets/cargarage.jpg";
import reminderImg from "../assets/logserv.jpg";

const Procedure = () => {
  return (
    <div className="bg-[#FCE7C8] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Steps */}
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>

          {/* Step 1 - Create Garage Account */}
          <div className="flex items-start bg-[#B1C29E] p-4 rounded-lg shadow-sm mb-4 hover:scale-105 transition-transform">
            <Image
              src={garageImg}
              alt="Garage Account"
              width={80}
              height={80}
              className="rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <UserPlus className="mr-2 text-[#F0A04B]" />
                Create a Garage Account
              </h3>
              <p className="text-gray-700 text-sm">
                Register your garage and log in. From here, you will see your
                registered clients.
              </p>
            </div>
          </div>

          {/* Step 2 - Add Clients & Record Services */}
          <div className="flex items-start bg-[#B1C29E] p-4 rounded-lg shadow-sm mb-4 hover:scale-105 transition-transform">
            <Image
              src={clientImg}
              alt="Client Account"
              width={80}
              height={80}
              className="rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <LogIn className="mr-2 text-[#F0A04B]" />
                Add Clients & Record Services
              </h3>
              <p className="text-gray-700 text-sm">
                Create accounts for your clients, log into their account, record
                car services, and track history.
              </p>
            </div>
          </div>

          {/* Step 3 - Schedule Reminders */}
          <div className="flex items-start bg-[#B1C29E] p-4 rounded-lg shadow-sm hover:scale-105 transition-transform">
            <Image
              src={reminderImg}
              alt="Reminder Setup"
              width={80}
              height={80}
              className="rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Bell className="mr-2 text-[#F0A04B]" />
                Schedule Reminders
              </h3>
              <p className="text-gray-700 text-sm">
                Set automatic reminders for future car maintenance schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Detailed Steps */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Step-by-Step Process
          </h3>
          <ol className="list-decimal pl-5 text-gray-800 space-y-3 text-sm">
            <li className="flex items-center">
              <Rocket className="mr-2 text-[#F0A04B]" />
              Click on **Get Started** 🚀.
            </li>
            <li className="flex items-center">
              <UserPlus className="mr-2 text-[#F0A04B]" />
              Sign up your **Garage details** and log in.
            </li>
            <li className="flex items-center">
              <ClipboardList className="mr-2 text-[#F0A04B]" />
              Go to the **Clients Section** and create client accounts.
            </li>
            <li className="flex items-center">
              <LogIn className="mr-2 text-[#F0A04B]" />
              Log into a **client’s account** to record vehicle history.
            </li>
            <li className="flex items-center">
              <Bell className="mr-2 text-[#F0A04B]" />
              Use the **reminder feature** to notify clients.
            </li>
            <li className="flex items-center">
              <ClipboardList className="mr-2 text-[#F0A04B]" />
              Manage all **clients, services, and upcoming schedules** through
              your Garage account.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Procedure;
