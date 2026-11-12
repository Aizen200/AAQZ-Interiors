import type { Metadata } from "next";
import { Cinzel, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Close to the lettering in the ZS Design Studio logo.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "ZS Design Studio | Interior Designing Company in Mumbai",
  description:
    "We take pride in our reputation for creating spectacular interiors for commercial and residential customers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
