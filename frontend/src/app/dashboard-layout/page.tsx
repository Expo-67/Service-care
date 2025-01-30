"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuthStore from "../store/useAuthStore.js"; //  Zustand store
import { useEffect } from "react";
const sidebarItems = [
  { icon: DashboardIcon, text: "Dashboard", href: "/dashboard" },
  { icon: DescriptionIcon, text: "Log Service", href: "/log-service" },
  { icon: DescriptionIcon, text: "Service Records", href: "/service-records" },
  { icon: NotificationsIcon, text: "Reminders", href: "/reminders" },
  { icon: EmojiObjectsIcon, text: "AI Suggestions", href: "/ai-suggestions" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore((state) => state); // Access the logout function from Zustand

  const handleLogout = () => {
    logout(); // Clear the user session
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl">Service-moti</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Items */}
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
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 mt-4 text-gray-700 hover:text-blue-600"
              >
                <ExitToAppIcon className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
