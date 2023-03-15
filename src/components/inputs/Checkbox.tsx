import React, { FC, InputHTMLAttributes } from "react";
import { useField } from "formik";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Checkbox: FC<CheckboxProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const isInvalid = meta.error && meta.touched;

  return (
    <div className={`w-full px-2`}>
      <label htmlFor={name} className="cursor-pointer">
        Is/are the sample(s) properly packaged using NCDC approved transport
        box(es)?{" "}
        <span>
          {field.value === true ? (
            <span className="text-green-600">
              {"("}&#10003;{")"}
            </span>
          ) : (
            ""
          )}
          Y .
        </span>
        <span className="inline-block w-[20px]"></span>
        <span>
          {field.value === false ? (
            <span className="text-green-600">
              {" ("}&#10003;{".)"}
            </span>
          ) : (
            ""
          )}{" "}
          N
        </span>
      </label>
      <input
        id={name}
        className="hidden"
        type="checkbox"
        {...props}
        {...field}
      />
      {isInvalid ? <div className="text-red-400">{meta.error}</div> : null}
    </div>
  );
};

export default Checkbox;
