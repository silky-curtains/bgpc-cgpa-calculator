import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";

// import Drawer from "@/components/Drawer";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description: "A website to calculate CGPA for BITS Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CGPA Calculator</title>
      </head>
      <body
        className={cn(
          "flex min-h-screen w-full flex-col justify-center scroll-smooth bg-background font-sans antialiased",
          "dark"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen flex-col items-center px-3 pt-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
