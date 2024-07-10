"use client"; // Add this line at the top

import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import Footer from "@/components/foot/page";
import Navbar from "@/components/nav/page";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define paths where Navbar and Footer should be hidden
  const hideNavAndFooter = pathname === '/login' || pathname === '/signup';

  return (
    <div className={inter.className}>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}