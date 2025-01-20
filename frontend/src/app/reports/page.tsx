"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout/page";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Button } from "@/components/ui/button"; // Ensure this path is correct

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type ServiceRecord = {
  id: number;
  service: string;
  date: string;
  cost: number;
};

// Define the structure of Chart.js data
type ChartData = {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor: string | string[];
  }[];
};

export default function Reports() {
  const [records] = useState<ServiceRecord[]>([
    { id: 1, service: "Oil Change", date: "2023-10-15", cost: 50 },
    { id: 2, service: "Tire Rotation", date: "2023-11-10", cost: 40 },
    { id: 3, service: "Brake Inspection", date: "2023-12-20", cost: 60 },
    { id: 4, service: "Oil Change", date: "2024-01-10", cost: 50 },
    { id: 5, service: "Tire Rotation", date: "2024-01-20", cost: 40 },
  ]);

  const [barData, setBarData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<ChartData | null>(null);

  const generateReport = () => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - 4);

    // Filter records within the last 3-4 months
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= pastDate && recordDate <= today;
    });

    // Bar chart: Group data by month
    const monthlyCosts: { [key: string]: number } = {};
    filteredRecords.forEach((record) => {
      const month = new Date(record.date).toLocaleString("default", {
        month: "short",
      });
      monthlyCosts[month] = (monthlyCosts[month] || 0) + record.cost;
    });

    setBarData({
      labels: Object.keys(monthlyCosts),
      datasets: [
        {
          label: "Service Costs",
          data: Object.values(monthlyCosts),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });

    // Pie chart: Group data by service type
    const serviceDistribution: { [key: string]: number } = {};
    filteredRecords.forEach((record) => {
      serviceDistribution[record.service] =
        (serviceDistribution[record.service] || 0) + 1;
    });

    setPieData({
      labels: Object.keys(serviceDistribution),
      datasets: [
        {
          data: Object.values(serviceDistribution),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
        },
      ],
    });
  };

  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Reports</h1>
        <Button onClick={generateReport} className="mb-6">
          Generate Service Report
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Monthly Service Costs
            </h2>
            {barData ? (
              <Bar data={barData} />
            ) : (
              <p className="text-gray-500">No data to display</p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Service Type Distribution
            </h2>
            {pieData ? (
              <Pie data={pieData} />
            ) : (
              <p className="text-gray-500">No data to display</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
