"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({
    BrandofCar: "",
    ModelofCar: "",
    YearOfMan: "",
    EngineCapacity: "",
    carIntake: {
      petrol: false,
      diesel: false,
      electric: false,
      hybrid: false,
      lpg: false,
      cng: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      carIntake: {
        petrol: false,
        diesel: false,
        electric: false,
        hybrid: false,
        lpg: false,
        cng: false,
        [value]: true,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cardetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit car details");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle success (e.g., reset form or redirect user)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to user)
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
            {/* Brand Input */}
            <div className="space-y-2">
              <Label htmlFor="BrandofCar">Brand of Car</Label>
              <Input
                id="BrandofCar"
                name="BrandofCar"
                value={formData.BrandofCar}
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
                value={formData.ModelofCar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Year of Manufacture Input */}
            <div className="space-y-2">
              <Label htmlFor="YearOfMan">Year of Manufacture</Label>
              <Input
                id="YearOfMan"
                name="YearOfMan"
                type="number"
                value={formData.YearOfMan}
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
                value={formData.EngineCapacity}
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
                  Object.keys(formData.carIntake).find(
                    (key) =>
                      formData.carIntake[key as keyof typeof formData.carIntake]
                  ) || ""
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
