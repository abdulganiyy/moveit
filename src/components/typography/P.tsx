import React, { FC, ReactNode } from "react";

interface PProps {
  children: ReactNode;
}

const P: FC<PProps> = ({ children }) => {
  return (
    <h1 className="text-[16px] leading-[22.4px] text-[#8B9CA1]">{children}</h1>
  );
};

export default P;
