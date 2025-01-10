// /app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/NavBar/Navbar";
import "../app/assets/styles/main.scss";
import ClientProvider from "@/app/components/Providers/ClientProvider";
import Footer from "@/app/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopiDrone",
  description: "Achetez et vendez des drones et accessoires entre particuliers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} page`}>
        <ClientProvider>
          <div id="full-wrapper">
          <Navbar />
              {children}
            <Footer/>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
