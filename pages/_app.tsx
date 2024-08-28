import React from 'react';
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { AppProps } from 'next/app';
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/utils/lib/utils"
import ThemeContextProvider from '@/context/ThemeContext';
import Layout from "@/components/layout";
import { Toaster } from '@/components/ui/sonner';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}>
      <ThemeContextProvider>
        <SessionProvider session={session}>
          {/* <Layout> */}
          <Component {...pageProps} className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )} />
           <Toaster position="top-right" />
          {/* </Layout> */}
        </SessionProvider>
      </ThemeContextProvider>
    </div>
  );
}

