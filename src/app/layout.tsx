import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daanyam | Virtual Gaushala",
  description: "A calm, ritual-first digital seva experience for daily gau daan habits."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
