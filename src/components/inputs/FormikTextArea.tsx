import React, { FC, TextareaHTMLAttributes, ReactNode } from "react";
import { useField } from "formik";

interface FormikTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const FormikTextArea: FC<FormikTextAreaProps> = ({ name, label, ...rest }) => {
  const [field, meta] = useField(name);

  const isInvalid = meta.error && meta.touched;
  return (
    <div className="flex flex-col gap-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea id={name} {...rest} {...field}></textarea>

      {isInvalid ? <span className="text-red-400">{meta.error}</span> : null}
    </div>
  );
};

export default FormikTextArea;
