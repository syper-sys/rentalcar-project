import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { connection } from "next/server";
import { getCarById } from "@/lib/api/cars";
import CarDetailsClient from "@/app/cars/[carId]/CarDetailsClient";

// This route reads request data (`params`) and React Query's `dehydrate()`
// reads `Date.now()`, so it cannot be prerendered. Let it render on request.
export const instant = false;

type Props = {
  params: Promise<{ carId: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { carId } = await params;

  try {
    const car = await getCarById(carId);
    const title = `Rent ${car.brand} ${car.model} (${car.year})`;
    const description =
      `${car.brand} ${car.model} rental in ${car.location.city}, ` +
      `${car.location.country}. View the price, features and rental ` +
      `conditions, then request a booking with RentalCar.`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | RentalCar`,
        description,
        type: "website",
        images: car.img ? [{ url: car.img, alt: `${car.brand} ${car.model}` }] : [],
      },
    };
  } catch {
    const description =
      "Explore car specifications, rental conditions and booking options with RentalCar.";

    return {
      title: "Car Rental Details",
      description,
      openGraph: {
        title: "Car Rental Details | RentalCar",
        description,
        type: "website",
      },
    };
  }
}

const CarDetails = async ({ params }: Props) => {
  await connection();

  const { carId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};

export default CarDetails;
