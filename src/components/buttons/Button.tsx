import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { ClipLoader } from "react-spinners";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <button
      className={`w-[275px] h-[55px] flex justify-center items-center bg-[#098750] text-white border-[1px] border-[#E0E0E0] rounded-md ${props.className}`}
      {...props}
    >
      {isLoading ? <ClipLoader size={30} color="white" /> : children}
    </button>
  );
};

export default Button;
