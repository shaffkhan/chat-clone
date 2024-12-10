"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticleBackground";
import { withAuth } from "@/components/withAuth";
import { Loader } from "@/components/loader";
import { useAuth } from "@/contexts/authContext";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Implement logout logic here
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    logout();
    router.push("/");
    setIsLoggingOut(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-transparent text-white">
      <ParticleBackground />

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-4 absolute top-4 left-4 z-20"
        onClick={toggleSidebar}
      ></button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gray-800 shadow-md z-10 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Jack’s AI Super Agent</h2>
          <nav className="space-y-2 flex-grow">
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
          </nav>
          <Button
            onClick={handleLogout}
            className="w-full mt-auto"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? <Loader className="mr-2" /> : null}
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto p-8 relative z-10"
        onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking on the main content
      >
        {children}
      </main>
    </div>
  );
}

export default withAuth(AuthenticatedLayout);
