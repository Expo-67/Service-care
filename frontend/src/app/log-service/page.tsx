"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "react-hot-toast";

// Service Items type definition
type ServiceItemKey =
  | "engineOil"
  | "oilFilter"
  | "airCleanerFilter"
  | "FrontDifferentialOil"
  | "RearDifferentialOil"
  | "TransmissionOil"
  | "TransferOil"
  | "fuelorDieselFilter"
  | "Greasing"
  | "PowerSteeringFluid"
  | "sparkPlugs"
  | "brakePads"
  | "brakeFluid";

// Initial state for service items
const initialServiceItemsState = {
  engineOil: { checked: false, changed: false },
  oilFilter: { checked: false, changed: false },
  airCleanerFilter: { checked: false, changed: false },
  FrontDifferentialOil: { checked: false, changed: false },
  RearDifferentialOil: { checked: false, changed: false },
  TransmissionOil: { checked: false, changed: false },
  TransferOil: { checked: false, changed: false },
  fuelorDieselFilter: { checked: false, changed: false },
  Greasing: { checked: false, changed: false },
  PowerSteeringFluid: { checked: false, changed: false },
  sparkPlugs: { checked: false, changed: false },
  brakePads: { checked: false, changed: false },
  brakeFluid: { checked: false, changed: false },
};

export default function LogService() {
  const router = useRouter();

  // State for service details
  const [serviceDetails, setServiceDetails] = useState({
    date: "",
    mileage: "",
    garageName: "",
    mechanicName: "",
    nextServiceMileage: "",
  });

  // State for service items
  const [serviceItems, setServiceItems] = useState(initialServiceItemsState);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  // Handle changes in service details
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in service items
  const handleServiceItemChange = (
    itemKey: ServiceItemKey,
    action: "checked" | "changed",
    value: boolean
  ) => {
    setServiceItems((prev) => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], [action]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ ...serviceDetails, serviceItems }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Service logged successfully!🛠️🎉");
        setTimeout(() => {
          router.push("/service-records");
        }, 2000);
      } else {
        throw new Error(responseData.message || "Failed to log service");
      }
    } catch (error) {
      setMessage({
        type: "error",
        content:
          error instanceof Error ? error.message : "Failed to log service",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Service-moti: Log Service📝🚙
          </CardTitle>
        </CardHeader>
        <CardContent>
          {message.content && (
            <div
              className={`mb-4 p-2 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.content}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Details */}
            <div className="space-y-2">
              <Label htmlFor="date">Service Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={serviceDetails.date}
                onChange={handleDetailsChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={serviceDetails.mileage}
                onChange={handleDetailsChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="garageName">Garage Name</Label>
              <Input
                id="garageName"
                name="garageName"
                type="string"
                value={serviceDetails.garageName}
                onChange={handleDetailsChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mechanicName">Mechanic Name</Label>
              <Input
                id="mechanicName"
                name="mechanicName"
                type="string"
                value={serviceDetails.mechanicName}
                onChange={handleDetailsChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextServiceMileage">Next Service Mileage</Label>
              <Input
                id="nextServiceMileage"
                name="nextServiceMileage"
                type="number"
                value={serviceDetails.nextServiceMileage}
                onChange={handleDetailsChange}
                required
              />
            </div>

            {/* Service Items */}
            <div className="space-y-2">
              <Label>Service Items</Label>
              <div className="grid grid-cols-2 gap-5">
                {Object.entries(serviceItems).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${key}-checked`}
                        checked={value.checked}
                        onCheckedChange={(checked) =>
                          handleServiceItemChange(
                            key as ServiceItemKey,
                            "checked",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`${key}-checked`} className="text-sm">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}{" "}
                        (Checked)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${key}-changed`}
                        checked={value.changed}
                        onCheckedChange={(checked) =>
                          handleServiceItemChange(
                            key as ServiceItemKey,
                            "changed",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={`${key}-changed`} className="text-sm">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}{" "}
                        (Changed)
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging Service..." : "Log Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </DashboardLayout>
  );
}
