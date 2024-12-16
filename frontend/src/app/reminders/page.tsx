"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout/page";
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
  id: number;
  service: string;
  date: string;
};

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, service: "Oil Change", date: "2023-12-15" },
    { id: 2, service: "Tire Rotation", date: "2024-01-10" },
    { id: 3, service: "Brake Inspection", date: "2024-02-20" },
  ]);
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  const addReminder = () => {
    if (newService && newDate) {
      setReminders([
        ...reminders,
        { id: reminders.length + 1, service: newService, date: newDate },
      ]);
      setNewService("");
      setNewDate("");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Reminders</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add New Reminder</h2>
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
            <Button onClick={addReminder} className="mt-6">
              Add Reminder
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell>{reminder.service}</TableCell>
                  <TableCell>{reminder.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
