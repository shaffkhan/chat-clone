import { Inter } from 'next/font/google';
import { ThemeProvider } from "next-themes";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";
import { AuthProvider } from '@/contexts/authContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jack’s AI Super Agent",
  description: "Created by xeven solutions llc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <ParticleBackground />
          <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

