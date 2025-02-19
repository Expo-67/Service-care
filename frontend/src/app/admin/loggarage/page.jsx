"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import brand2 from "../../assets/brand2.png";

const logGaragepage = () => {
  // State for form fields
  const [garageName, setGarageName] = useState("");
  const [garageLocation, setGarageLocation] = useState("");
  const [garageEmail, setGarageEmail] = useState("");
  const [garagePassword, setGaragePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <CardTitle className="text-2xl font-bold">Service-moti</CardTitle>
            <Image
              src={brand2}
              alt="Service-moti logo"
              width={72}
              height={62}
              className="rounded-full"
            />
          </div>
          <CardDescription>Log into your Garage account🔧🏎️!</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="garageName">Garage Name</Label>
              <Input
                id="garageName"
                placeholder="Enter your garage name"
                value={garageName}
                onChange={(e) => setGarageName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="garagePassword">Garage Password</Label>
              <div className="relative">
                <Input
                  id="garagePassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your garage password"
                  value={garagePassword}
                  onChange={(e) => setGaragePassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "logging in..." : "Log in Garage"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Create a new Garage Account?{" "}
            <a
              href="/admin/reggarage"
              className="text-blue-500 hover:underline"
            >
              Signup Garage
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default logGaragepage;
