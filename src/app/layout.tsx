import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daanyam Planner",
  description: "A calm, intention-first daily Sankalp + Karma planner"
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
