import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "./Layout.scss";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Header from "@/components/Layout/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TG",
  description:
    "Tommy Grabowski's Portfolio: Explore React projects, blog posts, and my web development journey. Learn about my skills and experience.",
  keywords: [
    "Tommy Grabowski",
    "React",
    "web development",
    "portfolio",
    "blog",
    "projects",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <div className="layout flex w-full">
            <Navbar />
            <div className="layout__main flex-1">
              <Header />
              <div className="layout__main--outer bg-slate-200 p-4">
                <ScrollArea className="layout__main--inner w-full rounded bg-mint-cream p-4 shadow-xl">
                  {children}
                </ScrollArea>
              </div>
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
