"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useBookCar } from "@/lib/hooks/useBookCar";
import clsx from "clsx";
import css from "@/components/BookCarForm/BookCarForm.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { PiWarningCircleBold } from "react-icons/pi";

interface BookCarFormProps {
  carId: string;
}

interface BookCarFormSchema {
  name: string;
  email: string;
  comment: string;
}

const INITIAL_VALUES: BookCarFormSchema = {
  name: "",
  email: "",
  comment: "",
};

const BookCarValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be greater or equals 2 characters")
    .max(32, "Name must be less or equals 32 characters")
    .required("Name is required"),
  email: Yup.string()
    .max(64, "Email must be less or equals 64 characters")
    .email("Incorrect type of email, example: rentalcar@mail.com")
    .required("Email is required"),
  comment: Yup.string()
    .max(256, "Comment must be less or equals 256 characters")
    .required("Comment is required"),
});

function BookCarForm({ carId }: BookCarFormProps) {
  const fieldId = useId();
  const { bookCar, isSuccess } = useBookCar();

  const handleSubmit = async (
    values: BookCarFormSchema,
    { resetForm }: any,
  ) => {
    try {
      if (!carId) {
        toast.error("Car Id not found");
        return;
      }

      await bookCar({
        carId: carId,
        bookingData: values,
      });

      toast.success("Car booked successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to submit booking request");
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={BookCarValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <div className={css.textWrapper}>
            <h2 className={css.title}>Book your car now</h2>
            <p className={css.text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>

          <div className={css.containerWrapper}>
            <div>
              <Field name="name">
                {({ field, meta }: any) => {
                  const hasError = Boolean(meta.touched && meta.error);
                  return (
                    <>
                      <div className={css.labelWrapper}>
                        <label
                          className={clsx(css.label, {
                            [css.labelError]: hasError,
                          })}
                          htmlFor={`${fieldId}-name`}
                        >
                          Name*
                        </label>
                      </div>
                      <div className={css.inputWrapper}>
                        <input
                          {...field}
                          id={`${fieldId}-name`}
                          type="text"
                          placeholder="Name*"
                          className={clsx(css.input, {
                            [css.inputError]: hasError,
                          })}
                        />
                        {hasError && (
                          <PiWarningCircleBold className={css.iconWarn} />
                        )}
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div>
              <Field name="email">
                {({ field, meta }: any) => {
                  const hasError = Boolean(meta.touched && meta.error);
                  return (
                    <>
                      <div className={css.labelWrapper}>
                        <label
                          className={clsx(css.label, {
                            [css.labelError]: hasError,
                          })}
                          htmlFor={`${fieldId}-email`}
                        >
                          Email*
                        </label>
                      </div>
                      <div className={css.inputWrapper}>
                        <input
                          {...field}
                          id={`${fieldId}-email`}
                          type="text"
                          placeholder="Email*"
                          className={clsx(css.input, {
                            [css.inputError]: hasError,
                          })}
                        />
                        {hasError && (
                          <PiWarningCircleBold className={css.iconWarn} />
                        )}
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <div>
              <Field name="comment">
                {({ field, meta }: any) => {
                  const hasError = Boolean(meta.touched && meta.error);
                  return (
                    <>
                      <div className={css.labelWrapper}>
                        <label
                          className={clsx(css.label, {
                            [css.labelError]: hasError,
                          })}
                          htmlFor={`${fieldId}-comment`}
                        >
                          Comment*
                        </label>
                      </div>
                      <div className={css.inputWrapper}>
                        <textarea
                          {...field}
                          id={`${fieldId}-comment`}
                          placeholder="Comment*"
                          className={clsx(css.input, css.textarea, {
                            [css.inputError]: hasError,
                          })}
                        />
                        {hasError && (
                          <PiWarningCircleBold className={css.iconWarn} />
                        )}
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </div>
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default BookCarForm;
