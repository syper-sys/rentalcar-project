import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

const description =
  "Browse rental cars by brand, price and mileage at RentalCar. Compare models, locations and rental prices, then find a car that fits your journey and budget.";

export const metadata: Metadata = {
  title: "Browse Rental Cars",
  description,
  openGraph: {
    title: "Browse Rental Cars | RentalCar",
    description,
    type: "website",
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
