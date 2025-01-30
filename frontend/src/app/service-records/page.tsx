"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../dashboard-layout/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useAuthStore from "../store/useAuthStore";

// Define the type for a single service record
type ServiceRecord = {
  _id: string; // Use a string or number for the ID
  date: string; // The date the service was logged
  type: string; // The type of service (e.g., "Oil Change")
  details: string; // Details about the service performed
  garageName: string;
  mechanicName: string;
  mileage: string;
  nextServiceMileage: number;
  serviceItems: {
    engineOil: {
      checked: boolean;
      changed: boolean;
    };
    oilFilter: {
      checked: boolean;
      changed: boolean;
    };
    airCleanerFilter: {
      checked: boolean;
      changed: boolean;
    };
    FrontDifferentialOil: {
      checked: boolean;
      changed: boolean;
    };
    RearDifferentalOil: {
      checked: boolean;
      changed: boolean;
    };
    TransmissionOil: {
      checked: boolean;
      changed: boolean;
    };
    TransferOil: {
      checked: boolean;
      changed: boolean;
    };
    fuelorDieselFilter: {
      checked: boolean;
      changed: boolean;
    };
    Greasing: {
      checked: boolean;
      changed: boolean;
    };
    PowerSteeringFluid: {
      checked: boolean;
      changed: boolean;
    };
    sparkPlugs: {
      checked: boolean;
      changed: boolean;
    };
    brakePads: {
      checked: boolean;
      changed: boolean;
    };
    brakeFluid: {
      checked: boolean;
      changed: boolean;
    };
  };
};

export default function ServiceRecords() {
  // Explicitly type the serviceRecords state as an array of ServiceRecord objects
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const { user } = useAuthStore((state: any) => state);

  useEffect(() => {
    const fetchServiceRecords = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/user/${user.id}`,
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

        console.log({ servicerecords: data });

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
              serviceRecords.map((record) => {
                console.log(record);

                return (
                  <AccordionItem value={record._id} key={record._id}>
                    <AccordionTrigger>
                      {record.date} - {record.type}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div>
                        <p>Garage Name: {record.garageName}</p>
                        <p>Mechanic Name: {record.mechanicName}</p>
                        <p>Next Service Mileage: {record.nextServiceMileage}</p>
                        <p>Service Items:</p>
                        <ul>
                          {Object.entries(record.serviceItems).map(
                            ([itemName, item]) => (
                              <li key={itemName}>
                                {itemName.charAt(0).toUpperCase() +
                                  itemName.slice(1)}
                                :
                                <ul>
                                  <li>
                                    Checked: {item.checked ? "Yes" : "No"}
                                  </li>
                                  <li>
                                    Changed: {item.changed ? "Yes" : "No"}
                                  </li>
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })
            ) : (
              <p>No service records found</p>
            )}
          </Accordion>
        )}
      </div>
    </DashboardLayout>
  );
}
