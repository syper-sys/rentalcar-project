import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCarsFilters } from "../api/cars";

export function useGetCarsFilters() {
  return useQuery({
    queryKey: ["carsFilters"],
    queryFn: getCarsFilters,
    placeholderData: keepPreviousData,
  });
}
