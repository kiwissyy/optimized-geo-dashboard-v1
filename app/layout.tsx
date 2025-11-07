import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
export const metadata: Metadata = {
  title: "Optimized Geo Dashboard",
  description: "High-performance satellite data visualization dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
