import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Providers from "@/app/Providers";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";

const manrope = Manrope({
  variable: "--font-family",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--second-family",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar",
    template: "%s | RentalCar",
  },
  description: "RentalCar | find your dream car for low prices and filters",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "RentalCar",
    description: "RentalCar | find your dream car for low prices and filters",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Header></Header>
          {children}
          </Providers>
      </body>
    </html>
  );
}
