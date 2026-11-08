import type { Metadata } from "next";
import css from "./page.module.css";
import Image from "next/image";
import HeroImage from "@/public/Images/Picture.png";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Your Perfect Rental Car",
  description:
    "Find your perfect rental car with RentalCar. Explore reliable, budget-friendly vehicles for every journey, then browse our catalog to choose the right ride.",
  openGraph: {
    title: "Find Your Perfect Rental Car | RentalCar",
    description:
      "Find your perfect rental car with RentalCar. Explore reliable, budget-friendly vehicles for every journey, then browse our catalog to choose the right ride.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <main className={css.main}>
        <div className={`${css.container} container`}>
          <Image
            src={HeroImage}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            alt=""
            className={css.heroImage}
          />
          <div className={css.content}>
            <div className={css.textWrapper}>
              <h2 className={css.title}>Find your perfect rental car</h2>
              <p className={css.text}>
                Reliable and budget-friendly rentals for any journey
              </p>
            </div>
            <Link href="/cars" className={css.link}>
              View catalog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
