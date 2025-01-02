import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_F_NAME} ${process.env.NEXT_PUBLIC_L_NAME} | Portfolio`,
  description: "Welcome to my portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
