"use client";

import { useState } from "react";
import AdminLayout from "../components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from "lucide-react";

type FormField = {
  id: string;
  label: string;
  type: string;
};

export default function AdminServices() {
  const [getStartedFields, setGetStartedFields] = useState<FormField[]>([
    { id: "brand", label: "Brand of Car", type: "text" },
    { id: "type", label: "Type of Brand", type: "text" },
    { id: "engineCapacity", label: "Engine Capacity", type: "text" },
    { id: "year", label: "Year of Manufacture", type: "number" },
    { id: "fuel", label: "Fuel", type: "select" },
  ]);

  const [serviceFields, setServiceFields] = useState<FormField[]>([
    { id: "serviceDate", label: "Service Date", type: "date" },
    { id: "mileage", label: "Mileage", type: "number" },
    { id: "serviceType", label: "Service Type", type: "text" },
    { id: "mechanicName", label: "Mechanic Name", type: "text" },
  ]);

  const [newField, setNewField] = useState<FormField>({
    id: "",
    label: "",
    type: "text",
  });

  const addField = (formType: "getStarted" | "service") => {
    if (newField.id && newField.label) {
      if (formType === "getStarted") {
        setGetStartedFields([
          ...getStartedFields,
          { ...newField, id: newField.id.toLowerCase().replace(/\s+/g, "_") },
        ]);
      } else {
        setServiceFields([
          ...serviceFields,
          { ...newField, id: newField.id.toLowerCase().replace(/\s+/g, "_") },
        ]);
      }
      setNewField({ id: "", label: "", type: "text" });
    }
  };

  const removeField = (formType: "getStarted" | "service", id: string) => {
    if (formType === "getStarted") {
      setGetStartedFields(getStartedFields.filter((field) => field.id !== id));
    } else {
      setServiceFields(serviceFields.filter((field) => field.id !== id));
    }
  };

  const renderFormFields = (
    fields: FormField[],
    formType: "getStarted" | "service"
  ) => (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Input value={field.label} readOnly />
          <Select value={field.type} disabled>
            <SelectTrigger>
              <SelectValue>{field.type}</SelectValue>
            </SelectTrigger>
          </Select>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeField(formType, field.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>
      <Tabs defaultValue="getStarted">
        <TabsList>
          <TabsTrigger value="getStarted">Get Started Form</TabsTrigger>
          <TabsTrigger value="service">Service Form</TabsTrigger>
        </TabsList>
        <TabsContent value="getStarted">
          <Card>
            <CardHeader>
              <CardTitle>Customize Get Started Form</CardTitle>
            </CardHeader>
            <CardContent>
              {renderFormFields(getStartedFields, "getStarted")}
              <div className="mt-4 space-y-4">
                <Input
                  placeholder="New field name"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({
                      ...newField,
                      label: e.target.value,
                      id: e.target.value,
                    })
                  }
                />
                <Select
                  value={newField.type}
                  onValueChange={(value) =>
                    setNewField({ ...newField, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => addField("getStarted")}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Customize Service Form</CardTitle>
            </CardHeader>
            <CardContent>
              {renderFormFields(serviceFields, "service")}
              <div className="mt-4 space-y-4">
                <Input
                  placeholder="New field name"
                  value={newField.label}
                  onChange={(e) =>
                    setNewField({
                      ...newField,
                      label: e.target.value,
                      id: e.target.value,
                    })
                  }
                />
                <Select
                  value={newField.type}
                  onValueChange={(value) =>
                    setNewField({ ...newField, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => addField("service")}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
