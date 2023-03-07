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
  return (
    <div className="flex flex-col gap-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <Select id={name} options={options} {...rest} />
    </div>
  );
};

export default FormikSelect;
