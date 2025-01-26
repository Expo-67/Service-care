"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../dashboard-layout/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the type for a single service record
type ServiceRecord = {
  id: string; // Use a string or number for the ID
  date: string; // The date the service was logged
  type: string; // The type of service (e.g., "Oil Change")
  details: string; // Details about the service performed
};

export default function ServiceRecords() {
  // Explicitly type the serviceRecords state as an array of ServiceRecord objects
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchServiceRecords = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service records");
        }

        const data: ServiceRecord[] = await response.json();
        setServiceRecords(data); // Set the fetched records into state
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching records"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRecords();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Records</h1>

        {/* Display loading state */}
        {loading && <p>Loading service records...</p>}

        {/* Display error message if any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display service records in an accordion */}
        {!loading && !error && (
          <Accordion type="single" collapsible className="w-full">
            {serviceRecords.length > 0 ? (
              serviceRecords.map((record) => (
                <AccordionItem value={record.id} key={record.id}>
                  <AccordionTrigger>
                    {record.date} - {record.type}
                  </AccordionTrigger>
                  <AccordionContent>{record.details}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p>No service records found</p>
            )}
          </Accordion>
        )}
      </div>
    </DashboardLayout>
  );
}
