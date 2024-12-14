"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type Reminder = {
  id: number;
  service: string;
  date: string;
};

type RemindersContextType = {
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
};

const RemindersContext = createContext<RemindersContextType | undefined>(
  undefined
);

export const RemindersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, service: "Oil Change", date: "2023-12-15" },
    { id: 2, service: "Tire Rotation", date: "2024-01-10" },
    { id: 3, service: "Brake Inspection", date: "2024-02-20" },
  ]);

  return (
    <RemindersContext.Provider value={{ reminders, setReminders }}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => {
  const context = useContext(RemindersContext);
  if (context === undefined) {
    throw new Error("useReminders must be used within a RemindersProvider");
  }
  return context;
};
