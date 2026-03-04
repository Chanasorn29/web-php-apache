import type { Metadata } from "next";
import { Josefin_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const josefin = Josefin_Slab({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Quietquote",
  description: "Here's something gentle today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased`}>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
