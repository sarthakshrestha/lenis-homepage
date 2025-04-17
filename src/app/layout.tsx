"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./_components/menu";
import Footer from "./_components/footer";
import { initSmoothScroll } from "@/utils/pageUtil";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize Lenis smooth scrolling after component mounts
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();

    // Clean up when component unmounts
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>MAXSTUDIOS</title>
        <meta name="description" content="MAXSTUDIOS creative agency" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
