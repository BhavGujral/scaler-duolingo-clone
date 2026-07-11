"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen pb-24 md:pb-0 md:pl-24`}>
        {children}
        <Navigation />
        <Toaster position="top-center" toastOptions={{ className: 'font-bold rounded-2xl border-2 px-6 py-4' }} />
      </body>
    </html>
  );
}