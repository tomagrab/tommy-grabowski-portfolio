import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import './Layout.scss';
import Navbar from '@/components/Layout/Navbar/Navbar';
import Header from '@/components/Layout/Header/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { dark } from '@clerk/themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TG',
  description:
    "Tommy Grabowski's Portfolio: Explore React projects, blog posts, and my web development journey. Learn about my skills and experience.",
  keywords: [
    'Tommy Grabowski',
    'React',
    'web development',
    'portfolio',
    'blog',
    'projects',
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
                <Analytics />
                <SpeedInsights />
              </div>
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}

function FacebookSDK() {
  return (
    <>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=1133437477680501"
        nonce="pF9vaOfV"
      ></script>
    </>
  );
}
