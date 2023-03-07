import React, { FC, ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="font-bold text-[48px] leading-[64px] text-[#4A4B65]">
      {children}
    </h1>
  );
};

export default Title;
