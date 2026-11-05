"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useId } from "react";
import css from "@/components/GetCarsForm/GetCarsForm.module.css";
import * as Yup from "yup";
import { GetCarsParams } from "@/lib/api/cars";

interface GetCarsFormProps {
  onSubmit: (params: GetCarsParams) => void;
  onClearFilters: () => void;
}

interface CarsValuesSchema {
  brand: string;
  price: string;
  mileage: {
    min: string;
    max: string;
  };
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

const buildParams = (values: CarsValuesSchema): GetCarsParams => {
  const params: GetCarsParams = {};

  if (values.brand) params.brand = values.brand;
  if (values.price) params.price = Number(values.price);
  if (values.mileage.min) params.minMileage = Number(values.mileage.min);
  if (values.mileage.max) params.maxMileage = Number(values.mileage.max);

  return params;
};

function GetCarsForm({ onSubmit, onClearFilters }: GetCarsFormProps) {
  const fieldId = useId();

  const handleSubmit = (values: CarsValuesSchema) => {
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
          <label className={css.label} htmlFor={`${fieldId}-brand`}>Car brand</label>
          <Field
            as="select"
            id={`${fieldId}-brand`}
            name="brand"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="brand" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-price`}>Price/ 1 hour</label>
          <Field
            as="select"
            id={`${fieldId}-price`}
            name="price"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="price" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label className={css.label} htmlFor={`${fieldId}-mileage-from`}>Car mileage / km</label>
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

function ClearFiltersButton({
  onClear,
}: {
  onClear: () => void;
  className?: string;
}) {
  const { resetForm } = useFormikContext<CarsValuesSchema>();

  const handleClick = () => {
    resetForm();
    onClear();
  };

  return (
    <button type="button" onClick={handleClick} className={css.clearBtn}>
      Clear filters
    </button>
  );
}

export default GetCarsForm;
