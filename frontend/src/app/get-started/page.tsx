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
    carIntake: "petrol",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
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
              <Label htmlFor="brand">Brand of Car</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.BrandofCar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Model Input */}
            <div className="space-y-2">
              <Label htmlFor="model">Model of Car</Label>
              <Input
                id="model"
                name="model"
                value={formData.ModelofCar}
                onChange={handleChange}
                required
              />
            </div>

            {/* Year of Manufacture Input */}
            <div className="space-y-2">
              <Label htmlFor="yearOfManufacture">Year of Manufacture</Label>
              <Input
                id="yearOfManufacture"
                name="yearOfManufacture"
                type="number"
                value={formData.YearOfMan}
                onChange={handleChange}
                required
              />
            </div>

            {/* Engine Capacity Input */}
            <div className="space-y-2">
              <Label htmlFor="engineCapacity">Engine Capacity</Label>
              <Input
                id="engineCapacity"
                name="engineCapacity"
                type="number"
                value={formData.EngineCapacity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fuel Type Select */}
            <div className="space-y-2">
              <Label htmlFor="fuel">Car Intake</Label>
              <Select
                data-id="fuel"
                value={formData.carIntake}
                onValueChange={(value) =>
                  handleSelectChange("carIntake", value)
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
