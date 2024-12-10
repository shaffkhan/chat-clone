"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/loader";
import { useAuth } from "@/contexts/authContext"; // Make sure this path is correct
import { toast, Toaster } from "sonner";

interface Agent {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
  is_deleted: boolean;
  node_attrs: {
    name: string;
    description: string;
    config_attrs: {
      prompt: string;
    };
  };
  updated_at: string | null;
}

export default function ExistingAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { token } = useAuth();

  const fetchAgents = async (pageNum: number) => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId || !token) {
      toast.error("User information not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://jacks-542808340038.us-central1.run.app/api/fetch-chatbot?user_id=${userId}&limit=6&page=${pageNum}`,
        {
          headers: {
            accept: "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }

      const responseData = await response.json();
      const chatbots = responseData.data.Chatbots;
      if (pageNum === 1) {
        setAgents(chatbots);
      } else {
        setAgents((prevAgents) => [...prevAgents, ...chatbots]);
      }
      setHasMore(chatbots?.length === 6); 
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      toast.error("Failed to fetch agents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents(1);
  }, []);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchAgents(nextPage);
        return nextPage;
      });
    }
  };

  if (isLoading && agents.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Your Existing Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents?.map((agent) => (
          <Card key={agent.id} className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Created: {new Date(agent.created_at).toLocaleDateString()}
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
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? <Loader size={24} className="mr-2" /> : null}
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
