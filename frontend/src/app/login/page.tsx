"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gti from "../assets/gti.jpeg";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any existing error message

    try {
      // Perform the POST request to the backend login route
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, // Backend login URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies (for session management)
          body: JSON.stringify({ email, password }), // Send the email and password
        }
      );

      if (response.ok) {
        // On successful login, store the token and redirect to the dashboard
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store token in localStorage
        localStorage.setItem("userName", data.userName); // Store users name in localStorage

        router.push("/dashboard"); // Redirect to dashboard after successful login
      } else {
        // If there's an error, show error message
        const errorData = await response.json();
        setError(errorData.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); //  spinner stops loading
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-red-900 to-gray-200 rounded-[26px] m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-4 pb-4 font-bold text-3xl dark:text-gray-400 text-center cursor-default flex items-center justify-center space-x-3">
              <span>Service-moti</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={gti}
                alt="gti"
                width={42}
                height={42}
              />
            </h1>

            <span className="pt-2 pb-2 font-bold text-2xl dark:text-gray-400 text-center cursor-default">
              Log-in
            </span>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}{" "}
              {/* Display error message if any */}
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-gray-500 hover:to-gray-700 transition duration-300 ease-in-out disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
