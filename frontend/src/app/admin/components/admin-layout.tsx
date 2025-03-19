"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import { Bell } from "lucide-react";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";

const sidebarItems = [
  { icon: DashboardIcon, text: "Dashboard", href: "/admin/dashboard" },
  { icon: PeopleIcon, text: "Clients & Services", href: "/admin/users" },
  { icon: Bell, text: "Reminders", href: "/admin/Remindersad" },
];

const profileItems = [
  { icon: PersonIcon, text: "Profile", href: "/admin/profile" },
  { icon: ExitToAppIcon, text: "Logout", href: "/logout" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl">Service-moti Admin</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-4">
                <NotificationsIcon className="h-5 w-5" />
              </Button>
              <Image
                className="h-8 w-8 rounded-full"
                src="/placeholder.svg?height=32&width=32"
                alt="Admin Avatar"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <div className="space-y-4">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-3 ${
                      pathname === item.href
                        ? "text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200">
              {profileItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-3 mt-4 ${
                      pathname === item.href
                        ? "text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.text}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
