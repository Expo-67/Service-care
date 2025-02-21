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

const garageonboardPage = () => {
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
          <CardDescription>Enter your login details 👤!</CardDescription>
        </CardHeader>
        <h3 className="text-red-500 text-xl text-center">
          {error && "Error logging in"}
        </h3>
        <CardContent></CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/Register" className="text-gray-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default garageonboardPage;
