"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gti from "../assets/gti.jpeg";

const Page: React.FC = () => {
  const router = useRouter();
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        console.log("Signup successful");
        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const data = await response.json();
        setError(
          data.error || "An error occurred during signup. Please try again."
        );
        console.log("Signup failed:", data);
      }
    } catch (err: unknown) {
      setError("An error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-red-800 to-gray-200 rounded-[26px] m-4"
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
              Sign-up
            </span>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="email"
                  placeholder="Email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-gray-500 hover:to-gray-700 transition duration-300 ease-in-out disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "SIGN UP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
