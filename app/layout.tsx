import siteInfo from "@/config/site.info";
import ReduxProvider from "@/lib/Providers/redux-provider";
import ThemeProvider from "@/lib/Providers/theme-provider";
import UserProvider from "@/lib/Providers/user-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${siteInfo.name}`,
  description:
    "Make it easy to book your tour trip with our wide selection of air tickets, hotels, and tour packages. You're sure to find the perfect vacation for you. Book your trip today and start your adventure!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NextTopLoader color="#8f8933" height={2} showSpinner={false} />
        <ReduxProvider>
          <ThemeProvider>
            <SessionProvider>
              <UserProvider>{children}</UserProvider>
            </SessionProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
