import React, { FC, InputHTMLAttributes, ReactNode } from "react";
import { useField } from "formik";
import TextInput from "./TextInput";

interface FormikInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ReactNode;
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
  const [field, meta] = useField(name);

  const isInvalid = meta.error && meta.touched;
  return (
    <div className="flex flex-col gap-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <TextInput
        id={name}
        icon={icon}
        direction={direction}
        {...rest}
        {...field}
      />
      {isInvalid ? <span className="text-red-400">{meta.error}</span> : null}
    </div>
  );
};

export default FormikInput;
