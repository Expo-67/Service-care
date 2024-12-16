"use client";

import { useState } from "react";
import AdminLayout from "../components/admin-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const users = [
  {
    id: 1,
    name: "John Doe",
    services: [
      { id: 1, name: "Oil Change", date: "2023-05-15" },
      { id: 2, name: "Tire Rotation", date: "2023-07-22" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    services: [
      { id: 1, name: "Brake Inspection", date: "2023-06-10" },
      { id: 2, name: "Air Filter Replacement", date: "2023-08-05" },
    ],
  },
];

export default function AdminReports() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chartType, setChartType] = useState<string | null>(null);

  const generateChartData = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return null;

    const labels = user.services.map((s) => s.name);
    const data = user.services.map((_, index) =>
      Math.floor(Math.random() * 100)
    );

    return {
      labels,
      datasets: [
        {
          label: "Service Data",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const renderChart = () => {
    if (!selectedUser || !chartType) return null;

    const chartData = generateChartData(selectedUser);
    if (!chartData) return null;

    switch (chartType) {
      case "bar":
        return <Bar data={chartData} />;
      case "line":
        return <Line data={chartData} />;
      case "pie":
        return <Pie data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Services History</TableHead>
            <TableHead>Generate Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Accordion type="single" collapsible>
                  <AccordionItem value="services">
                    <AccordionTrigger>View Services</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {user.services.map((service) => (
                          <li key={service.id}>
                            {service.name} - {service.date}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
              <TableCell>
                <Select onValueChange={(value) => setChartType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="mt-2"
                  onClick={() => setSelectedUser(user.id)}
                  disabled={!chartType}
                >
                  Generate Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {renderChart()}
    </AdminLayout>
  );
}
