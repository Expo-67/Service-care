"use client";

import AdminLayout from "../components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import garageAuthStore from "../../store/garageAuthStore.js"; //importing zustandstore
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function AdminDashboard() {
  const router = useRouter(); // for navigation
  //get the garage data from zustand store
  //garage- is the logged in garage the  data on the cookie consists of id ,name and location
  //loadGarage- a function to load the garage data from Zustand store.
  const { garage, loadGarage } = garageAuthStore((state) => state);

  //const [garageName, setGarageName] = useState();

  useEffect(() => {
    loadGarage(); //fetch the logged in garage data from zustand store

    if (!garage) router.push("admin/loggarage"); //if not garage  redirect to login page of garage
  }, []);
  // Mock datas
  const registerdclients = 10;
  const remindersset = 2;

  return (
    //greeting of garage owner
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Hi {garage?.garageName}👋Welcome to your Garage Admin account🔧🏎️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current garage clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{registerdclients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled client reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{remindersset}</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
