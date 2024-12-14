"use client";

import Link from "next/link";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReminders } from "../contexts/RemindersContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const { reminders } = useReminders();

  // Mock data for the next service
  const nextServiceDate = new Date("2024-03-15");
  const today = new Date();
  const lastServiceDate = new Date("2023-09-15");
  const totalDays =
    (nextServiceDate.getTime() - lastServiceDate.getTime()) /
    (1000 * 3600 * 24);
  const daysElapsed =
    (today.getTime() - lastServiceDate.getTime()) / (1000 * 3600 * 24);
  const progressPercentage = Math.min(
    Math.round((daysElapsed / totalDays) * 100),
    100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Welcome to Your Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage your car service and maintenance from here.
            </p>
            <div className="space-x-4">
              <Button>Get Started</Button>
              <Button variant="outline" asChild>
                <Link href="/profile">Edit Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Next Service Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progressPercentage} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Last service: {lastServiceDate.toLocaleDateString()}
                </span>
                <span>
                  Next service: {nextServiceDate.toLocaleDateString()}
                </span>
              </div>
              <p className="text-center text-lg font-medium">
                {progressPercentage}% progress to next service
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Upcoming Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.slice(0, 3).map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell>{reminder.service}</TableCell>
                    <TableCell>{reminder.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {reminders.length > 3 && (
              <div className="mt-4 text-center">
                <Button variant="link" asChild>
                  <Link href="/reminders">View all reminders</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
