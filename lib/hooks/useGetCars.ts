import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { getCars, GetCarsParams } from "../api/cars";

export function useGetCars(params: GetCarsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["cars", params],
    queryFn: () => getCars(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
}
