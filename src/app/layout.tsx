import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  referrer: "origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
