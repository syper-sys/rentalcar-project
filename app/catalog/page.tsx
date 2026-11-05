"use client";

import { useState } from "react";
import GetCarsForm from "@/components/GetCarsForm/GetCarsForm";
import { useGetCars } from "@/lib/hooks/useGetCars";
import { GetCarsParams } from "@/lib/api/cars";

function Catalog() {
  const [filters, setFilters] = useState<GetCarsParams>({ perPage: 12 });

  const {
    data,
    status,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCars(filters);

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleClearFilters = () => {
    // Back to unfiltered list — the hook refetches because the queryKey changes
    setFilters({ perPage: 12 });
  };

  return (
    <>
      <p>Catalog</p>
      <GetCarsForm onSubmit={setFilters} onClearFilters={handleClearFilters} />

      {status === "pending" && <p>Loading cars…</p>}
      {status === "error" && (
        <p>Something went wrong. Please try to reload the page.</p>
      )}

      {status === "success" && (
        <>
          {cars.length === 0 && <p>No cars found for the selected filters</p>}

          <ul style={{ opacity: isPlaceholderData ? 0.6 : 1 }}>
            {cars.map((car) => (
              <li key={car.id}>
                {car.brand} {car.model}, {car.year} — ${car.rentalPrice} / hour
              </li>
            ))}
          </ul>

          {hasNextPage && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              Load more
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Catalog;
