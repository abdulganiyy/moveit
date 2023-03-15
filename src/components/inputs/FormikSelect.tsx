import React, { FC, SelectHTMLAttributes } from "react";
import { useField } from "formik";
import Select from "./Select";

interface FormikSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: string[];
}

const FormikSelect: FC<FormikSelectProps> = ({
  name,
  label,
  options,
  ...rest
}) => {
  const [field, meta] = useField(name);

  const isInvalid = meta.error && meta.touched;

  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <label htmlFor={name} className={``}>
          {label}
        </label>
      )}
      <Select id={name} options={options} {...rest} {...field} />
      {isInvalid ? <span className="text-red-400">{meta.error}</span> : null}
    </div>
  );
};

export default FormikSelect;
