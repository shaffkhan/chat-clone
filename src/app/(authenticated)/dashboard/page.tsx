import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Agent</h2>
          <p className="mb-4">Start building your custom AI chatbot agent.</p>
          <Link href="/create-bot">
            <Button>Create Agent</Button>
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Existing Agents</h2>
          <p className="mb-4">
            View and manage your existing AI chatbot agents.
          </p>
          <Link href="/existing-agents">
            <Button>View Agents</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
