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
