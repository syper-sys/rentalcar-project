import css from "@/components/ClearFiltersButton/ClearFiltersButton.module.css"
import { useFormikContext } from "formik";
import { CarsValuesSchema } from "@/types/car";

function ClearFiltersButton({
  onClear,
  className,
}: {
  onClear: () => void;
  className?: string;
}) {
  const formikContext = useFormikContext<CarsValuesSchema>();

  const handleClick = () => {
    if (formikContext) {
      formikContext.resetForm();
    }
    onClear();
  };

  return (
    <button type="button" onClick={handleClick} className={`${css.clearBtn} ${className ?? ""}`}>
      Clear filters
    </button>
  );
}

export default ClearFiltersButton;