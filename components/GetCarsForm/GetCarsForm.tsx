import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface CarsInitialValuesSchema {
  brand: string;
  price: string;
  mileage: {
    min: number;
    max: number;
  };
}

const INITIAL_VALUES: CarsInitialValuesSchema = {
  brand: "",
  price: "",
  mileage: {
    min: 0,
    max: 0,
  },
};

const GetCarsValidationSchema = Yup.object({
  brand: Yup.string(),
  price: Yup.string(),
  mileage: Yup.object(),
});

function GetCarsForm() {
  const handleSubmit = () => {};
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={GetCarsValidationSchema}
      onSubmit={handleSubmit}
    ></Formik>
  );
}
