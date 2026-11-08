import { useQuery } from "@tanstack/react-query";
import { getCarById } from "../api/cars";

export function useGetCarById(carId: string) {
  return useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId),
  });
}
