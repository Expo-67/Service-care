"use client";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Service Costs",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const pieData = {
  labels: ["Oil Change", "Tire Service", "Brake Service", "Other"],
  datasets: [
    {
      data: [30, 25, 20, 25],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Monthly Service Costs
            </h2>
            <Bar data={barData} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Service Type Distribution
            </h2>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
