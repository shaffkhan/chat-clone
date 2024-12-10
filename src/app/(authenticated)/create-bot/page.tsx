"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader } from "@/components/loader";
import { useAuth } from "@/contexts/authContext"; // Make sure this path is correct
import { toast, Toaster } from 'sonner';

export default function CreateBotPage() {
  const [botName, setBotName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [allowFileUpload, setAllowFileUpload] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('User ID not found. Please log in again.');
      setIsCreating(false);
      return;
    }

    const chatbotData = {
      name: botName,
      user_id: userId,
      description: prompt,
      config_attrs: {
        prompt: prompt
      }
    };

    try {
      const response = await fetch('https://jacks-542808340038.us-central1.run.app/api/create-chatbot', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': token || ''
        },
        body: `chatbot_data=${encodeURIComponent(JSON.stringify(chatbotData))}`
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Bot created successfully!');
        router.push("/existing-agents");
      } else {
        throw new Error(data.message || 'Failed to create bot');
      }
    } catch (error) {
      console.error('Error creating bot:', error);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster />
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Your AI Chatbot
          </CardTitle>
          <CardDescription className="text-gray-400">
            Customize your bot's behavior and capabilities
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="bot-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Bot Name
              </label>
              <Input
                id="bot-name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Enter your bot's name"
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="prompt"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Prompt
              </label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter the initial prompt for your bot"
                required
                className="min-h-[100px] bg-gray-700 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allow-file-upload"
                checked={allowFileUpload}
                onCheckedChange={setAllowFileUpload}
              />
              <label
                htmlFor="allow-file-upload"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Allow File Upload
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? <Loader className="mr-2" /> : null}
              {isCreating ? "Creating Bot..." : "Create Bot"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

