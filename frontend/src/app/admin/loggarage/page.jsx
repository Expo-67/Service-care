"use client";
import React, { useState } from "react";
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
import useGarageAuthStore from "../../store/garageAuthStore"; // Zustand garage store for authentication

const LogGaragePage = () => {
  // Initialize the state variables for  the garage name and password and error messsage
  const router = useRouter(); // to handle page navigation once login go to dashboard
  const [garageName, setGarageName] = useState("");
  const [garagePassword, setGaragePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //integrate with Zustand to handle the login function
  const { login } = useGarageAuthStore(); //  login function is in the garageAuthStore it sends the garage name and password to the backend

  //form submission function handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the form from refreshing the page
    setIsLoading(true); // shows that the form is being submitted
    setError("");

    try {
      const isLoggedIn = await login({ garageName, garagePassword }); // Call the login function

      if (!isLoggedIn) {
        //if login fails
        setError("Wrong garage name or password.");
        console.log("Wrong garage name or password.");
      } else {
        //if login is successful
        console.log("Garage login successful");
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //User interface for the login page
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
        <h3 className="text-red-900 font-serif text-center">
          {error && "🚫 Wrong garage name or password. Please try again! 🔑"}
        </h3>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="garageName"
                className="block text-gray-700 font-medium mb-2"
              >
                Garage Name
              </label>
              <input
                type="text"
                id="garageName"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your garage name"
                value={garageName}
                onChange={(e) => setGarageName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="garagePassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Garage Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="garagePassword"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            <button
              type="submit"
              className="w-full p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isLoading ? "Logging in..." : "Log in Garage"}
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center">
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

export default LogGaragePage;
