"use client";

import { useState } from "react";
import AdminLayout from "../components/admin-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
  id: number;
  name: string;
  services: { id: number; name: string; date: string }[];
  reminderSet: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      services: [
        { id: 1, name: "Oil Change", date: "2023-05-15" },
        { id: 2, name: "Tire Rotation", date: "2023-07-22" },
      ],
      reminderSet: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      services: [
        { id: 1, name: "Brake Inspection", date: "2023-06-10" },
        { id: 2, name: "Air Filter Replacement", date: "2023-08-05" },
      ],
      reminderSet: false,
    },
  ]);

  const removeUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Services</TableHead>
            <TableHead>Reminder Set</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Accordion type="single" collapsible>
                  <AccordionItem value="services">
                    <AccordionTrigger>View Services</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {user.services.map((service) => (
                          <li key={service.id}>
                            {service.name} - {service.date}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
              <TableCell>
                <Switch checked={user.reminderSet} />
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Remove User</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the user account and remove their data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeUser(user.id)}>
                        Yes, remove user
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
