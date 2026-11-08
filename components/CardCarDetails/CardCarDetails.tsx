import css from "@/components/CardCarDetails/CardCarDetails.module.css";
import { Car } from "@/types/car";

import { CiLocationOn, CiCalendarDate  } from "react-icons/ci";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";
import { TbGasStation } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { LiaRoadSolid } from "react-icons/lia";

interface CarDetailsCardProps {
  car: Car;
}

function CardCarDetails({ car }: CarDetailsCardProps) {
  return (
    <>
      <div className={css.container}>
        <div className={css.carDetailsContainer}>
          <div className={css.textDetailsWrapper}>
            <h2 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h2>
            <span className={css.article}>Article: {car.stockNumber}</span>
          </div>
          <p className={css.location}>
            <CiLocationOn /> {car.location.city}, {car.location.country}
          </p>
          <span className={css.price}>${car.rentalPrice}</span>
          <p className={css.description}>{car.description}</p>
        </div>

        <div className={css.carInfoContainer}>
          <div className={css.textInfoWrapper}>
            <h2 className={css.title}>Rental Conditions:</h2>
            <ul className={css.list}>
              {car.rentalConditions.map((conditions) => (
                <li key={conditions} className={css.item}>
                  <AiOutlineCheckCircle width="16" height="16"/> {conditions}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.textInfoWrapper}>
            <h2 className={css.title}>Car specifications:</h2>
            <ul className={css.list}>
              <li className={css.item}><CiCalendarDate /> Year: {car.year}</li>
              <li className={css.item}><IoCarSportOutline /> Type: {car.type}</li>
              <li className={css.item}><TbGasStation /> Fuel consumption: {car.fuelConsumption}</li>
              <li className={css.item}><GoGear /> Engine: {car.engine}</li>
              <li className={css.item}><LiaRoadSolid /> Mileage: {car.mileage}</li>
            </ul>
          </div>

          <div className={css.textInfoWrapper}>
            <h2 className={css.title}>Features</h2>
            <ul className={css.list}>
              {car.features.map((features) => (
                <li key={features} className={css.item}>
                  <AiOutlineCheckCircle width="16" height="16"/> {features}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCarDetails;
