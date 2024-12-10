import { Inter } from 'next/font/google';
import { ThemeProvider } from "next-themes";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Chatbot Creator",
  description: "Create and chat with your own AI chatbots",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

