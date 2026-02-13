import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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

const hikasami = localFont({
  src: "../public/fonts/Hikasami-Regular.ttf",
  variable: "--font-hikasami",
});

const zalando = localFont({
  src: "../public/fonts/ZalandoSans-Regular.ttf",
  variable: "--font-zalando",
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
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${haskoy.variable} ${domaine.variable} ${hikasami.variable} ${zalando.variable} antialiased bg-white dark:bg-black text-black dark:text-white font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
