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
  title: "AI News Daily - Latest AI & Machine Learning News",
  description: "Stay updated with the 3 most important AI news stories each day. Featuring a retro terminal interface and daily curated artificial intelligence content.",
  keywords: ["AI", "artificial intelligence", "machine learning", "news", "technology", "daily"],
  authors: [{ name: "AI News Daily" }],
  openGraph: {
    title: "AI News Daily",
    description: "Daily curated AI news in a retro terminal interface",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
