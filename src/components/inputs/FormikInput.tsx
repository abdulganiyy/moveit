import React, { FC, InputHTMLAttributes } from "react";
import { useField } from "formik";
import TextInput from "./TextInput";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: boolean;
  direction?: string;
  label?: string;
}

const FormikInput: FC<FormikInputProps> = ({
  name,
  label,
  icon,
  direction = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <TextInput id={name} icon={icon} direction={direction} {...rest} />
    </div>
  );
};

export default FormikInput;
