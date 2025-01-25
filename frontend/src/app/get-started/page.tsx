"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GetStarted() {
  const router = useRouter();

  // Separate state for general car details
  const [carDetails, setCarDetails] = useState({
    BrandofCar: "",
    ModelofCar: "",
    YearofMan: "",
    EngineCapacity: "",
  });

  // Separate state for car intake (fuel type)
  const [carIntake, setCarIntake] = useState({
    petrol: false,
    diesel: false,
    electric: false,
    hybrid: false,
    lpg: false,
    cng: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle general input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number.parseFloat(value) : value;
    setCarDetails({ ...carDetails, [name]: newValue });
  };

  // Handle fuel type selection change
  const handleSelectChange = (value: string) => {
    setCarIntake({
      petrol: false,
      diesel: false,
      electric: false,
      hybrid: false,
      lpg: false,
      cng: false,
      [value]: true,
    });
  };

  // Handle form submission with validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const { BrandofCar, ModelofCar, YearofMan, EngineCapacity } = carDetails;
    if (!BrandofCar || !ModelofCar || !YearofMan || !EngineCapacity) {
      setError("Please fill all required fields.");
      return;
    }

    // Check if a car intake type is selected
    const selectedIntake = Object.values(carIntake).includes(true);
    if (!selectedIntake) {
      setError("Please select a car intake (fuel type).");
      return;
    }

    // Clear any previous error and show loading state
    setError("");
    setIsLoading(true);

    try {
      // Submit form data via API request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cardetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...carDetails, carIntake }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Car details registered successfully", data);
        router.push("/profile"); // Redirect to profile page after successful submission
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error during car details registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit car details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Service-moti: Car Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Brand Input */}
            <div className="space-y-2">
              <Label htmlFor="BrandofCar">Brand of Car</Label>
              <Input
                id="BrandofCar"
                name="BrandofCar"
                value={carDetails.BrandofCar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Model Input */}
            <div className="space-y-2">
              <Label htmlFor="ModelofCar">Model of Car</Label>
              <Input
                id="ModelofCar"
                name="ModelofCar"
                value={carDetails.ModelofCar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Year of Manufacture Input */}
            <div className="space-y-2">
              <Label htmlFor="YearofMan">Year of Manufacture</Label>
              <Input
                id="YearofMan"
                name="YearofMan"
                type="number"
                value={carDetails.YearofMan}
                onChange={handleChange}
                required
              />
            </div>

            {/* Engine Capacity Input */}
            <div className="space-y-2">
              <Label htmlFor="EngineCapacity">Engine Capacity</Label>
              <Input
                id="EngineCapacity"
                name="EngineCapacity"
                type="number"
                value={carDetails.EngineCapacity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fuel Type Select */}
            <div className="space-y-2">
              <Label htmlFor="carIntake">Car Intake</Label>
              <Select
                onValueChange={handleSelectChange}
                value={
                  Object.keys(carIntake).find(
                    (key) => carIntake[key as keyof typeof carIntake]
                  ) || undefined
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select car intake type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="lpg">LPG</SelectItem>
                  <SelectItem value="cng">CNG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
