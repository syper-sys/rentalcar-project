"use client";

import css from "@/app/cars/[carId]/CarDetails.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetCarById } from "@/lib/hooks/useGetCarById";
import CardCarDetails from "@/components/CardCarDetails/CardCarDetails";
import BookCarForm from "@/components/BookCarForm/BookCarForm";

export default function CarDetailsClient() {
  const { carId } = useParams<{ carId: string }>();
  const { data } = useGetCarById(carId);

  return (
    <section className={"section"}>
      <div className={`${css.container} container`}>
        <div className={css.contentWrapper}>
          {data && (
            <>
              <div className={css.carFormContainer}>
              <Image
                src={data.img}
                alt={data.description}
                className={css.img}
                width="640"
                height="512"
              ></Image>
              <BookCarForm carId={data.id} />
              </div>
              <CardCarDetails car={data}/>
            </>
          )}
        </div>
        <div className={css.detailsWrapper}></div>
      </div>
    </section>
  );
}
