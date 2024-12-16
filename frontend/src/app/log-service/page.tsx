"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({
    serviceDate: "",
    mileage: "",
    garageName: "",
    mechanicName: "",
    nextServiceMileage: "",
    serviceItems: initialServiceItems,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Service logged:", formData);
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

            <Button type="submit" className="w-full">
              Log Service
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
