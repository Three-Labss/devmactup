import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalHeader } from "@/components/header";

export const metadata: Metadata = {
  title: "DevMatchup - Networking App",
  description: "Connect with developers and entrepreneurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ConditionalHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
