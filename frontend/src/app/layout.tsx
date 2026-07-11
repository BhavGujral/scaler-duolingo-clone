"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  if (!mounted) {
    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen pb-24 md:pb-0 md:pl-24 invisible`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body className={`${inter.className} min-h-screen pb-24 md:pb-0 md:pl-24 ${theme === 'dark' ? 'dark' : ''}`}>
        {children}
        <Navigation />
        <Toaster position="top-center" toastOptions={{ className: 'font-bold rounded-2xl border-2 px-6 py-4 dark:bg-slate-800 dark:text-white dark:border-slate-700' }} />
      </body>
    </html>
  );
}