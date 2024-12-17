"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// Define a type for service items
type ServiceItem = {
  checked: boolean;
  changed: boolean;
};

type ServiceItems = {
  [key: string]: ServiceItem;
};

const initialServiceItems: ServiceItems = {
  engineOil: { checked: false, changed: false },
  oilFilter: { checked: false, changed: false },
  airFilter: { checked: false, changed: false },
  fuelFilter: { checked: false, changed: false },
  sparkPlugs: { checked: false, changed: false },
  brakePads: { checked: false, changed: false },
  brakeFluid: { checked: false, changed: false },
};

export default function LogService() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceDate: "",
    mileage: "",
    garageName: "",
    mechanicName: "",
    nextServiceMileage: "",
    serviceItems: initialServiceItems,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleItemChange = (
    itemKey: keyof ServiceItems,
    action: "checked" | "changed",
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      serviceItems: {
        ...prev.serviceItems,
        [itemKey]: { ...prev.serviceItems[itemKey], [action]: value },
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await fetch("http://localhost:5000/api/services/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      let responseData;
      const responseText = await response.text();
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error(`Invalid response from server: ${responseText}`);
      }

      if (response.ok) {
        setMessage({ type: "success", content: "Service logged successfully" });
        setTimeout(() => {
          router.push("/service-records");
        }, 2000);
      } else {
        throw new Error(responseData.message || "Failed to log service");
      }
    } catch (error) {
      console.error("Error logging service:", error);
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
            Service-moti: Log Service
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
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Input
                id="serviceDate"
                name="serviceDate"
                type="date"
                value={formData.serviceDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Items Checked/Changed</Label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.serviceItems).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${key}-checked`}
                        checked={value.checked}
                        onCheckedChange={(checked) =>
                          handleItemChange(
                            key as keyof ServiceItems,
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
                          handleItemChange(
                            key as keyof ServiceItems,
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

            <div className="space-y-2">
              <Label htmlFor="garageName">Garage Name</Label>
              <Input
                id="garageName"
                name="garageName"
                value={formData.garageName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mechanicName">Mechanic Name</Label>
              <Input
                id="mechanicName"
                name="mechanicName"
                value={formData.mechanicName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextServiceMileage">Next Service Mileage</Label>
              <Input
                id="nextServiceMileage"
                name="nextServiceMileage"
                type="number"
                value={formData.nextServiceMileage}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging Service..." : "Log Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
