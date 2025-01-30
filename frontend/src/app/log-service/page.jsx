"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";
import useServiceStore from "../store/useServicestore";

// Define types for the service items
const ServiceItemKey = [
  "engineOil",
  "oilFilter",
  "airCleanerFilter",
  "FrontDifferentialOil",
  "RearDifferentialOil",
  "TransmissionOil",
  "TransferOil",
  "fuelorDieselFilter",
  "Greasing",
  "PowerSteeringFluid",
  "sparkPlugs",
  "brakePads",
  "brakeFluid",
];

// Initial state for service items
const initialServiceItemsState = ServiceItemKey.reduce((acc, item) => {
  acc[item] = { checked: false, changed: false };
  return acc;
}, {});

export default function LogService() {
  const router = useRouter();
  const { user } = useAuthStore(); // Get user from the auth store
  const { createService, getServices, services, isLoading, error } =
    useServiceStore();

  // Local state for service details (form inputs)
  const [serviceDetails, setServiceDetails] = useState({
    date: "",
    mileage: "",
    garageName: "",
    mechanicName: "",
    nextServiceMileage: "",
  });

  // Local state for service items (checkboxes)
  const [serviceItems, setServiceItems] = useState(initialServiceItemsState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  // Fetch services when the component mounts or user changes
  useEffect(() => {
    if (user) {
      getServices(user.id); // Fetch services for the logged-in user
    }
  }, [user, getServices]);

  // Handle input changes for service details (e.g., date, mileage)
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in service items checkboxes (checked or changed state)
  const handleServiceItemChange = (itemKey, action, value) => {
    setServiceItems((prev) => ({
      ...prev,
      [itemKey]: { ...prev[itemKey], [action]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    // Validate required fields before submitting
    if (
      !serviceDetails.date ||
      !serviceDetails.mileage ||
      !serviceDetails.garageName ||
      !serviceDetails.mechanicName ||
      !serviceDetails.nextServiceMileage
    ) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the createService function from the store
      await createService({ ...serviceDetails, serviceItems, userId: user.id });
      toast.success("Service logged successfully! 🛠️🎉");

      // Redirect to service records after a short delay
      setTimeout(() => {
        router.push("/service-records");
      }, 2000);
    } catch (error) {
      console.error(error); // Log error for debugging
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
            Service-moti: Log Service 📝🚙
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display success or error messages */}
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

          {/* Service logging form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Details Section */}
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
                type="text"
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
                type="text"
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

            {/* Service Items Section */}
            <div className="space-y-2">
              <Label>Service Items</Label>
              <div className="grid grid-cols-2 gap-5">
                {ServiceItemKey.map((key) => {
                  const value = serviceItems[key];
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${key}-checked`}
                          checked={value.checked}
                          onCheckedChange={(checked) =>
                            handleServiceItemChange(key, "checked", checked)
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
                            handleServiceItemChange(key, "changed", checked)
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
                  );
                })}
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
