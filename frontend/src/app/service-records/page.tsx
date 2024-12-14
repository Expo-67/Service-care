"use client";

import DashboardLayout from "../dashboard-layout/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const serviceRecords = [
  {
    id: "1",
    date: "2023-05-15",
    type: "Oil Change",
    details: "Changed oil and oil filter. Used synthetic 5W-30 oil.",
  },
  {
    id: "2",
    date: "2023-07-22",
    type: "Tire Rotation",
    details: "Rotated tires and checked air pressure.",
  },
  {
    id: "3",
    date: "2023-09-10",
    type: "Brake Service",
    details: "Replaced front brake pads and rotors.",
  },
];

export default function ServiceRecords() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Service Records</h1>
        <Accordion type="single" collapsible className="w-full">
          {serviceRecords.map((record) => (
            <AccordionItem value={record.id} key={record.id}>
              <AccordionTrigger>
                {record.date} - {record.type}
              </AccordionTrigger>
              <AccordionContent>{record.details}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </DashboardLayout>
  );
}
