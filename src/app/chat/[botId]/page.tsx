"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/loader";
import { toast, Toaster } from "sonner";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const botId = params.botId as string;

  useEffect(() => {
    // You might want to fetch initial chat history here
  }, [botId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      setIsLoading(true);

      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://jacks-542808340038.us-central1.run.app/api/answer-query?user_id=${userId}&chatbot_id=${botId}&query=${encodeURIComponent(
            input
          )}`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              token: localStorage.getItem("authToken") || "",
            },
          }
        );

        const data = await response.json();

        if (data.succeeded) {
          setMessages((prev) => [
            ...prev,
            { role: "bot", content: data.message },
          ]);
        } else {
          throw new Error(data.message || "Failed to get response from AI");
        }
      } catch (error) {
        console.error("Chat error:", error);
        toast.error("An unexpected error occurred");
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Sorry, I couldn't process your request." },
        ]);
      } finally {
        setIsLoading(false);
        setInput("");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <Toaster />
      <div className="w-full max-w-2xl bg-white/30 shadow-xl rounded-lg overflow-hidden">
        <header className="bg-gray-900 text-white p-4">
          <h1 className="text-2xl font-bold">Chat with AI Agent</h1>
        </header>
        <ScrollArea className="h-[60vh] p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader size={24} />
              <span className="ml-2">AI is thinking...</span>
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
