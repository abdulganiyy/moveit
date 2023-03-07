import React, { ReactNode, FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { isMobile } from "mobile-device-detect";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [_isMobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  if (_isMobile)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center p-4">
        <Image src="/access_denied.svg" alt="" width={200} height={150} />
        <span className="text-center pt-4">
          Not supported on mobile, change device and reload.
        </span>
      </div>
    );
  return (
    <div className="flex max-h-screen">
      <div className="flex-none w-[220px] max-h-screen bg-white py-[33px] px-[12px]">
        <Image src="/logo.svg" alt="logo" width={177} height={132} />
        <div className="mt-10 flex flex-col gap-x-4">
          <Link
            href="/dashboard-request"
            className="py-[13px] px-[16px] w-full flex items-center gap-x-4 bg-[#098750] rounded-md text-white"
          >
            <AiOutlineDashboard />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard-request/transactions"
            className="py-[13px] px-[16px] w-full flex items-center gap-x-4"
          >
            <BiTransfer /> <span>Transactions</span>
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto max-h-screen flex-auto bg-[#ECECEC] px-[17px] py-[45px]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
