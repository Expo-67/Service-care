"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import brand2 from "../assets/brand2.png";
import useAuthStore from "../store/useAuthStore.js";

const LoginPage = () => {
  const { login, user, isAuthenticated } = useAuthStore((state) => state);
  const [email, setEmail] = useState(""); // Changed to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {}, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const isLoggedIn = await login({ email, password }); // Pass email instead of username

    if (!isLoggedIn) {
      setError("Invalid email or password.");
      console.log("Invalid email or password.");
      setIsLoading(false);
    } else {
      console.log("User login page", user);
      console.log("Auth login page", isAuthenticated);
      router.push("/dashboard");

      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white/90 to-gray-800 p-4">
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
            Enter your client 👤 login details 🔐!
          </CardDescription>
        </CardHeader>
        <h3 className="text-red-500 text-xl text-center">
          {error && "Error logging in"}
        </h3>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gray-600 text-white rounded-md hover:bg-gary-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/Register" className="text-gray-600 hover:underline">
              Sign up your client 👤✍️
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
