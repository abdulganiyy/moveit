import React, { FC, InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  direction?: string;
}

const TextInput: FC<TextInputProps> = ({
  icon,
  direction = "left",
  className,
  ...rest
}) => {
  return (
    <div
      className={`w-[275px] md:w-[380px] h-[55px] border-[1px] border-[#E0E0E0] rounded-md flex p-4 items-center ${className}`}
    >
      {direction === "left" ? <div>{icon}</div> : null}
      <div className="ml-2 flex-auto">
        <input className="w-full outline-0 border-0" {...rest} />
      </div>
      {direction === "right" ? <div>{icon}</div> : null}
    </div>
  );
};

export default TextInput;
