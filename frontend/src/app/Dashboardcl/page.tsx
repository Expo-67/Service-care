"use client";

import React from "react";
import Image from "next/image";
import gti from "../assets/gti.jpeg";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TuneIcon from "@mui/icons-material/Tune";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FaceIcon from "@mui/icons-material/Face";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Button } from "@/components/ui/button";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-red-300  text-white p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="pt-4 pb-4 font-bold text-3xl dark:text-gray-400 text-center cursor-default flex items-center justify-center space-x-3">
              <span>Service-moti</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={gti}
                alt="gti"
                width={42}
                height={42}
              />
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 7.165 7 9.388 7 11v3c0 .53-.21 1.039-.595 1.405L5 17h5m0 0a3 3 0 1 0 6 0m-6 0h6"
              />
            </svg>
            <img
              className="w-8 h-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User Avatar"
            />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <div className="mb-6">
              {[
                { icon: DashboardIcon, text: "Dashboard" },
                { icon: TuneIcon, text: "Log Service" },
                { icon: FileCopyIcon, text: "Service Records" },
                { icon: AlarmIcon, text: "Reminders" },
                { icon: AssessmentIcon, text: "Reports" },
                { icon: LightbulbIcon, text: "AI Suggestions" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between text-gray-700 hover:text-black py-2"
                >
                  <span className="flex items-center">
                    <item.icon className="mr-2" />
                    {item.text}
                  </span>
                  <KeyboardArrowRightIcon />
                </a>
              ))}
            </div>
            <div>
              {[
                { icon: FaceIcon, text: "Profile" },
                { icon: SettingsIcon, text: "Settings" },
                { icon: PowerSettingsNewIcon, text: "Log out" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between text-gray-700 hover:text-black py-2"
                >
                  <span className="flex items-center">
                    <item.icon className="mr-2" />
                    {item.text}
                  </span>
                  <KeyboardArrowRightIcon />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-indigo-900 mt-4">
                Car name <strong>model goes here</strong>
              </h2>
            </div>
          </div>
          <div className="flex-1 bg-white/90 border border-blue-200 rounded-xl p-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl text-red-300">Next Service</h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
