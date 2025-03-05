"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const SignupGaragePage = () => {
  const router = useRouter();
  const [garageName, setGarageName] = useState("");
  const [garageLocation, setGarageLocation] = useState("");
  const [garageEmail, setGarageEmail] = useState("");
  const [garagePassword, setGaragePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [garageName, garageLocation, garageEmail, garagePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/garage/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            garageName,
            garageLocation,
            garageEmail,
            garagePassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Garage signup successful:", data);
        localStorage.setItem("garageToken", data.token);
        router.push("/admin/loggarage");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error during garage signup");
      }
    } catch (err) {
      console.error("Garage signup error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <CardDescription>
            Create a 🆕 account for your Garage to get started 🔧!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="garageName">Garage Name</Label>
              <Input
                id="garageName"
                placeholder="Autospares"
                value={garageName}
                onChange={(e) => setGarageName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="garageLocation">Garage Location</Label>
              <Input
                id="garageLocation"
                type="text"
                placeholder="Ngong Road"
                value={garageLocation}
                onChange={(e) => setGarageLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="garageEmail">Garage Email</Label>
              <Input
                id="garageEmail"
                type="email"
                placeholder="autospare@email.com"
                value={garageEmail}
                onChange={(e) => setGarageEmail(e.target.value)}
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
              {isLoading ? "Signing up..." : "Sign Up Garage"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have a Garage Account?{" "}
            <a
              href="/admin/loggarage"
              className="text-blue-500 hover:underline"
            >
              Log into Garage
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupGaragePage;
