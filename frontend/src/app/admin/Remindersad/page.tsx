"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "../components/admin-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Reminder {
  _id: string;
  service: string;
  date: string;
  clientName: string;
}

export default function AdminReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setIsLoading(true);
    try {
      // Simulating API call with setTimeout
      setTimeout(() => {
        const mockReminders: Reminder[] = [
          {
            _id: "1",
            service: "Oil Change",
            date: "2023-06-15",
            clientName: "John Doe",
          },
          {
            _id: "2",
            service: "Tire Rotation",
            date: "2023-06-20",
            clientName: "Jane Smith",
          },
        ];
        setReminders(mockReminders);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast.error("Error fetching reminders.");
      setIsLoading(false);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      // Simulating API call
      setReminders(reminders.filter((reminder) => reminder._id !== id));
      toast.success("Reminder deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete reminder. Please try again.");
    }
  };

  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Toast Container */}
        <Toaster position="top-right" reverseOrder={false} />

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            Admin Reminders Dashboard 📅
          </h1>

          <div className="mb-6">
            <Label htmlFor="search">Search Reminders</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by service or client name"
              className="mt-1"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading reminders...
                    </TableCell>
                  </TableRow>
                ) : filteredReminders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No reminders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReminders.map((reminder) => (
                    <TableRow key={reminder._id}>
                      <TableCell>{reminder.service}</TableCell>
                      <TableCell>{reminder.date}</TableCell>
                      <TableCell>{reminder.clientName}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteReminder(reminder._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
