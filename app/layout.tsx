import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const haskoy = localFont({
  src: "../public/fonts/Haskoy.ttf",
  variable: "--font-haskoy",
});

const domaine = localFont({
  src: "../public/fonts/DomaineDispNar-Regular.otf",
  variable: "--font-domaine",
});

export const metadata: Metadata = {
  title: "SwiftJS Documentation",
  description: "A fast, modern, and type-safe web framework for Node.js and Bun",
  icons: "/image.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${haskoy.variable} ${domaine.variable} antialiased bg-white dark:bg-black text-black dark:text-white font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
