import React, { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  placeholder?: string;
}

const Select: FC<SelectProps> = ({
  placeholder = "Select an option",
  options,
  ...props
}) => {
  return (
    <select
      {...props}
      className={`rounded-md border-[1px] border-[#B3B3B3] outline-0 min-w-[200px] w-full h-[40px] pr-2 focus:ring-0`}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default Select;
