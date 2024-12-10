"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  createdAt: string;
}

export default function ExistingAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Simulating API call to fetch existing agents
    const fetchAgents = async () => {
      // Replace this with your actual API call
      const response = await fetch("/api/agents");
      const data = await response.json();
      setAgents(data);
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Existing Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Created: {new Date(agent.createdAt).toLocaleDateString()}
              </p>
              <Button
                className="mt-4"
                onClick={() => router.push(`/chat/${agent.id}`)}
              >
                Chat with Agent
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
