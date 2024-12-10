"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ParticleBackground />
      <aside className="w-64 bg-gray-800 shadow-md relative z-10">
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">AI Chatbot</h2>
          <nav className="space-y-2 flex-grow">
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link
              href="/create-bot"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              <Button variant="ghost" className="w-full justify-start">
                Create Your Agent
              </Button>
            </Link>
            <Link
              href="/existing-agents"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              <Button variant="ghost" className="w-full justify-start">
                Your Existing Agents
              </Button>
            </Link>
          </nav>
          <Button onClick={handleLogout} className="w-full mt-auto">
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
