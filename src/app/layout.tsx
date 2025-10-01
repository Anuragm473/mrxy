import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr.Xy - Premium Headwear Store",
  description:
    "Shop stylish headwear at Mr.Xy: Baseball, Snapback, Trucker,Alpha gen kids, Fitted, and Exclusive collections.",
  keywords:
    "caps, snapback, fitted cap, baseball cap, trucker cap,alpha gen kids cap, headwear, Mr.Xy",
  openGraph: {
    title: "Mr.Xy - Premium Headwear Store",
    description:
      "Discover the exclusive collection of stylish caps and headwear at Mr.Xy.",
    url: "https://yourdomain.com",
    siteName: "Mr.Xy",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Mr.Xy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 👇 Prevents dark mode auto inversion on mobile */}
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-white text-black`}
      >
        <CartProvider>
          {/* ✅ fixed "black" class → text-black */}
          <div className="bg-white text-black text-xl my-3 font-bold text-center">
            Get 10% OFF on Prepaid Orders
          </div>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
