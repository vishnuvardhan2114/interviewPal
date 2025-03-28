import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
    <html lang="en" className="dark">
      <body
        className={`${mono_Sans.variable}  antialiased pattern`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
