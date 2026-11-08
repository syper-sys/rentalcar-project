"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useId, useMemo } from "react";
import css from "@/components/GetCarsForm/GetCarsForm.module.css";
import * as Yup from "yup";
import { GetCarsParams, GetCarsFiltersResponse } from "@/lib/api/cars";
import ClearFiltersButton from "../ClearFiltersButton/ClearFiltersButton";
import { CarsValuesSchema } from "@/types/car";

interface GetCarsFormProps {
  brands: string[];
  priceRange: GetCarsFiltersResponse["price"] | null;
  onSubmit: (params: GetCarsParams) => void;
  onClearFilters: () => void;
}

const INITIAL_VALUES: CarsValuesSchema = {
  brand: "",
  price: "",
  mileage: {
    min: "",
    max: "",
  },
};

const GetCarsValidationSchema = Yup.object({
  brand: Yup.string(),
  price: Yup.string(),
  mileage: Yup.object(),
});

const PRICE_STEP = 10;

const buildParams = (values: CarsValuesSchema): GetCarsParams => {
  const params: GetCarsParams = {};

  if (values.brand) params.brand = values.brand;
  if (values.price) params.price = Number(values.price);
  if (values.mileage.min) params.minMileage = Number(values.mileage.min);
  if (values.mileage.max) params.maxMileage = Number(values.mileage.max);

  return params;
};

function GetCarsForm({
  onSubmit,
  onClearFilters,
  brands,
  priceRange,
}: GetCarsFormProps) {
    
  const fieldId = useId();
  const priceOptions = useMemo(() => {
    if (!priceRange) return [];
    const { min, max } = priceRange;
    return Array.from(
      { length: Math.floor((max - min) / PRICE_STEP) + 1 },
      (_, index) => min + index * PRICE_STEP
    );
  }, [priceRange]);

  const handleSubmit = (values: CarsValuesSchema) => {
    if(!values){
      return;
    }
    onSubmit(buildParams(values));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={GetCarsValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={`${css.form} container`}>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-brand`}>
            Car brand
          </label>
          <Field
            as="select"
            id={`${fieldId}-brand`}
            name="brand"
            className={css.select}
          >
            <option value="" disabled>
              Choose a brand
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Field>
          <ErrorMessage name="brand" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-price`}>
            Price/ 1 hour
          </label>
          <Field
            as="select"
            id={`${fieldId}-price`}
            name="price"
            className={css.select}
          >
            <option value="" disabled>
              Choose a price
            </option>
            {priceOptions.map((price) => (
              <option key={price} value={String(price)}>
                {price}
              </option>
            ))}
          </Field>
          <ErrorMessage name="price" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-mileage-from`}>
            Car mileage / km
          </label>
          <div className={css.containerWrapper}>
            <Field
              id={`${fieldId}-mileage-from`}
              name="mileage.min"
              type="text"
              inputMode="numeric"
              placeholder="From"
              className={`${css.input} ${css.from}`}
            />
            <Field
              id={`${fieldId}-mileage-to`}
              name="mileage.max"
              type="text"
              inputMode="numeric"
              placeholder="To"
              className={`${css.input} ${css.to}`}
            />
          </div>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={false}>
            Search
          </button>
          <ClearFiltersButton
            onClear={onClearFilters}
            className={css.cancelButton}
          />
        </div>
      </Form>
    </Formik>
  );
}

export default GetCarsForm;
