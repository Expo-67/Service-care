"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard-layout/page";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Reminder = {
  _id: string; // MongoDB IDs
  service: string;
  date: string;
};

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch reminders from the backend
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reminder`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reminders.");
        }
        const data = await response.json();
        setReminders(data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  // Add a new reminder
  const addReminder = async () => {
    if (!newService || !newDate) {
      toast.error("Please fill out both the service and date fields!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reminder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ service: newService, date: newDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add reminder.");
      }

      const newReminder = await response.json();
      setReminders([...reminders, newReminder]); // Update state
      setNewService("");
      setNewDate("");
      toast.success("Reminder set successfully! 🎉📌"); // Success notification
    } catch (error) {
      console.error("Error adding reminder:", error);
      toast.error("Failed to add reminder. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a reminder
  const deleteReminder = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reminder/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reminder.");
      }

      setReminders(reminders.filter((reminder) => reminder._id !== id));
      toast.success("Reminder deleted successfully!🗑️");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete reminder. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Reminders📅</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Reminder🔔</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="service">Service</Label>
              <Input
                id="service"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="e.g., Oil Change"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <Button onClick={addReminder} className="mt-6" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Reminder"}
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((reminder) => (
                <TableRow key={reminder._id}>
                  <TableCell>{reminder.service}</TableCell>
                  <TableCell>{reminder.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => deleteReminder(reminder._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
