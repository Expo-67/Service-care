"use client";

import AdminLayout from "../components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  // Mock data
  const pendingReports = 5;
  const totalUsers = 100;
  const servicesDone = 250;
  const usersWithNextService = 30;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingReports}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Services Done</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{servicesDone}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Users with Next Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{usersWithNextService}</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
