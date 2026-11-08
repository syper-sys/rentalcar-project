"use client";

import { useState } from "react";
import GetCarsForm from "@/components/GetCarsForm/GetCarsForm";
import { useGetCars } from "@/lib/hooks/useGetCars";
import { useGetCarsFilters } from "@/lib/hooks/useGetCarsFilters";
import { GetCarsParams } from "@/lib/api/cars";
import ClearFiltersButton from "@/components/ClearFiltersButton/ClearFiltersButton";
import Loader from "@/components/Loader/Loader";
import NotFoundImage from "@/public/Images/image-12.png";
import Image from "next/image";
import Link from "next/link";
import css from "@/app/cars/page.module.css";
import toast from "react-hot-toast";

function Catalog() {
  const [filters, setFilters] = useState<GetCarsParams>({ perPage: 12 });

  const {
    data,
    status,
    isFetching,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCars(filters);

  const { data: carsFilters } = useGetCarsFilters();

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleClearFilters = () => {
    setFilters({ perPage: 12 });
  };

  return (
    <>
      <section className={`${css.section} section`}>
        <div className={`${css.container} container`}>
          <GetCarsForm
            onSubmit={setFilters}
            onClearFilters={handleClearFilters}
            brands={carsFilters?.brands ?? []}
            priceRange={carsFilters?.price ?? null}
          />

          {status === "error" &&
            (() => {
              toast.error("Server error. Please try again later");
              return null;
            })()}

          <div className={css.listWrapper}>
            {(status === "pending" || (isFetching && !isFetchingNextPage)) && (
              <div className={css.backdrop}>
                <div className={css.modal}>
                  <Loader />
                  <div className={css.modalTextWrapper}>
                    <h2 className={css.notFoundTitle}>Loading cars…</h2>
                    <p className={css.notFoundText}>
                      Please wait while we fetch the best cars for you
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === "success" && (
              <>
                {cars.length === 0 &&
                  (() => {
                    return (
                      <div className={css.notFoundContainer}>
                        <Image
                          src={NotFoundImage}
                          alt="No cars found with this filters"
                          width="413"
                          height="388"
                          className={css.notFoundImg}
                        ></Image>
                        <div className={css.notFoundTextWrapper}>
                          <h2 className={css.notFoundTitle}>No cars found</h2>
                          <p className={css.notFoundText}>
                            We couldn`t find any cars that match your current
                            filters. Try changing your search criteria or reset
                            the filters.
                          </p>
                        </div>
                        <ClearFiltersButton
                          onClear={handleClearFilters}
                          className={css.loadMoreBtn}
                        >
                        </ClearFiltersButton>
                      </div>
                    );
                  })()}

                <ul className={css.list}>
                  {cars.map((car) => (
                    <li key={car.id} className={css.item}>
                      <Image
                        src={car.img}
                        alt={car.description}
                        className={css.img}
                        width="244"
                        height="268"
                      ></Image>
                      <div className={css.containerTextWrapper}>
                        <h3 className={css.title}>
                          {car.brand}
                          <span className={css.accent}> {car.model}, </span>
                          {car.year}
                        </h3>
                        <p className={css.title}>${car.rentalPrice}</p>
                      </div>
                      <ul className={css.detailsWrapper}>
                        <li className={css.details}>{car.location.country}</li>
                        <li className={css.details}>{car.location.city}</li>
                        <li className={css.details}>{car.rentalCompany}</li>
                        <li className={css.details}>{car.type}</li>
                        <li className={css.details}>{car.mileage}</li>
                      </ul>
                      <Link
                        href={`/cars/${car.id}`}
                        className={css.readMoreBtn}
                      >
                        Read more
                      </Link>
                    </li>
                  ))}
                </ul>

                {hasNextPage && (
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className={css.loadMoreBtn}
                  >
                    Load more
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Catalog;
