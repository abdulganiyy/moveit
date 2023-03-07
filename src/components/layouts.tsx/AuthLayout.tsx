import React, { ReactNode, FC } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="h-[1000px] flex flex-col md:flex-row">
      <div className="flex-auto">
        <div className="flex justify-center items-center">
          <Image src="/logo.svg" alt="" width={177} height={132} />
        </div>
        <div className="px-4">{children}</div>
      </div>
      <div className="hidden md:block flex-none w-[554px] relative">
        <Image src="/background.svg" alt="" objectFit="cover" fill />
      </div>
    </main>
  );
};

export default AuthLayout;
