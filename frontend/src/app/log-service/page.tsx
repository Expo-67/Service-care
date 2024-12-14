import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LogService() {
  return (
    <DashboardLayout>
      <div className="relative h-[calc(100vh-8rem)] rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Volkswagen Car"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Button size="lg" className="text-xl px-8 py-6">
            Add Service
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
