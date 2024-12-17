"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SendIcon from "@mui/icons-material/Send";

export default function AISuggestions() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "How can I help you with your car today?" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, { role: "user", content: message }]);
      // Here you would typically send the message to an AI service and get a response
      // For this example, we'll just echo the message back
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { role: "assistant", content: `You said: ${message}` },
        ]);
      }, 1000);
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Car Health Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Regularly check and change your oil to keep your engine running
              smoothly.
            </li>
            <li>
              Rotate your tires every 5,000-8,000 miles to ensure even wear.
            </li>
            <li>Keep your car clean to prevent rust and maintain its value.</li>
            <li>
              Pay attention to unusual noises or vibrations and address them
              promptly.
            </li>
            <li>Follow your vehicles recommended maintenance schedule.</li>
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Chat with AI Assistant</h2>
          <div className="h-64 overflow-y-auto mb-4 p-4 border rounded">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>
              <SendIcon className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
