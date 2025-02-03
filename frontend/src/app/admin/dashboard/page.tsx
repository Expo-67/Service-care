"use client";

import AdminLayout from "../components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  // Mock data
  const registerdUsers = 10;
  const remindersset = 2;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{registerdUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{remindersset}</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
