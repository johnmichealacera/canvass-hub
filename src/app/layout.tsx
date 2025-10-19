import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { CartStorage } from "@/components/cart-storage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CanvassHub - Professional Canvassing Platform",
  description: "Streamline your procurement process with our professional canvassing platform",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <CartStorage />
          </div>
        </Providers>
      </body>
    </html>
  );
}
