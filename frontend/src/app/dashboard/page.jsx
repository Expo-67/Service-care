"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { format } from "date-fns";
import useAuthStore from "../store/useAuthStore";

export default function Dashboard() {
  const router = useRouter();
  const { user, loadUser, reminders, getReminders } = useAuthStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = useState(true);

  const [UserName, setUserName] = useState();

  useEffect(() => {
    loadUser();

    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    const fetchReminders = async () => {
      setIsLoading(true);
      try {
        if (!user) {
          toast.error("User not found. Please log in again.");
          return;
        }
        const id = user.id;
        await getReminders(id);
      } catch (error) {
        console.error("Error fetching reminders:", error);
        toast.error("Error fetching reminders.");
      } finally {
        setIsLoading(false);
      }
    };
    user && fetchReminders();
  }, [user]);

  return (
    <DashboardLayout>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="space-y-6">
        {/* User Greeting */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Hi {user?.userName}👋 Welcome to Service-Moti!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/get-started">Car details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reminders Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Your Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading reminders...</p>
            ) : (
              <ul className="space-y-2">
                {reminders.map((reminder) => (
                  <li
                    key={reminder._id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                  >
                    <span className="font-medium">{reminder.service}</span>
                    <span className="text-gray-600">
                      {format(new Date(reminder.date), "MMM dd, yyyy")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <Button asChild>
                <Link href="/reminders">Manage Reminders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
