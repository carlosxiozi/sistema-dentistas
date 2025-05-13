
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers/providers";

import { Inter, Roboto_Mono } from "next/font/google";

const geistSans = Inter({ subsets: ["latin"] });
const geistMono = Roboto_Mono({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Sistemas dental",
  description: "Producto de prueba para sistemas dental",
  manifest: "/manifest.json",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.style} ${geistMono.style} antialiased`}
      >
        <Providers >
          {children}
        </Providers>
      </body>
    </html>
  );
}
