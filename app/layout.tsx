import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rumov",
  description: "Plateforme artisans - Rumov",
};

export default function RootLayout({
  children,
  searchParams,   //  <<< ⚠ OBLIGATOIRE POUR TRANSMETTRE AUX PAGES
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
