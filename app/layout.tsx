import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";

const mono_Sans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

export const metadata: Metadata = {
  title: "InterviewPal",
  description: "An AI-powered Mock Interview Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mono_Sans.variable} antialiased bg-slate-50`}
      >
        <AnimatedBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
