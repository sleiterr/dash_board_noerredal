import type { Metadata } from "next";
import { DM_Sans, Fugaz_One } from "next/font/google";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Teams Dashboard",
  description:
    "A dashboard for Noerredal Farm built with Next.js and Tailwind CSS",
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
