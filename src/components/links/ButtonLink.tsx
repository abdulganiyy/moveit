import React, { FC, ReactNode } from "react";
import Link from "next/link";

interface ButtonLinkProps {
  children: ReactNode;
  href: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({ children, href }) => {
  return (
    <Link
      href={href}
      className="min-w-[182px] h-[39px] border-[1px] border-[#098750] rounded-[6px] bg-white text-[#098750] flex items-center justify-center"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
