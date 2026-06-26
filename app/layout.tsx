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
  metadataBase: new URL("https://clam.hackclub.com"),
  title: "clam",
  description: "clam",
  openGraph: {
    title: "clam",
    description: "clam",
    images: [
      {
        url: "/asciigeekedpatrick.png",
        width: 400,
        height: 319,
        alt: "clam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "clam",
    description: "clam",
    images: [
      {
        url: "/asciigeekedpatrick.png",
        alt: "clam",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
