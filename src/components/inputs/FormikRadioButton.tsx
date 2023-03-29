import React, { FC, InputHTMLAttributes } from "react";
import { useField } from "formik";

interface FormikRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const FormikRadioButton: FC<FormikRadioButtonProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, meta] = useField(name);

  const isInvalid = meta.error && meta.touched;

  return (
    <div className={`w-full`}>
      <input
        id={name}
        // className="w-[20px] h-[20px] rounded-md inline-block cursor-pointer translate-y-1 mr-1"
        type="radio"
        {...props}
        {...field}
      />
      <label htmlFor={name} className="cursor-pointer">
        {label}
      </label>

      {isInvalid ? <div className="text-red-400">{meta.error}</div> : null}
    </div>
  );
};

export default FormikRadioButton;
