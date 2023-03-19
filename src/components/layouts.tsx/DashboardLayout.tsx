import React, { ReactNode, FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { isMobile } from "mobile-device-detect";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface DashboardLayoutProps {
  children: ReactNode;
  links?: { name: string; path: string }[];
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  links = [
    { path: "/dashboard-request", name: "Dashboard" },
    { path: "/dashboard-request/transactions", name: "Transactions" },
  ],
}) => {
  const [_isMobile, setMobile] = useState<boolean>(false);

  const router = useRouter();

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
    <div className="flex min-h-screen">
      <div className="flex-none w-[220px] min-h-screen bg-white py-[33px] px-[12px]">
        <Image src="/logo.svg" alt="logo" width={177} height={132} />
        <div className="mt-10 flex flex-col gap-x-4">
          {links.map((link, i) => {
            return (
              <Link
                key={i}
                href={link.path}
                className={`${
                  router.pathname === link.path
                    ? "py-[13px] px-[16px] w-full flex items-center gap-x-4 bg-[#098750] rounded-md text-white"
                    : "py-[13px] px-[16px] w-full flex items-center gap-x-4"
                }`}
              >
                <AiOutlineDashboard />
                <span>{link.name}</span>
              </Link>
            );
          })}
          {/* <Link
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
          </Link> */}
        </div>
      </div>
      <div className="overflow-y-auto min-h-screen flex-auto bg-[#ECECEC] px-[17px] py-[45px]">
        {children}
      </div>
      <span
        className="fixed right-10 top-0 cursor-pointer"
        onClick={() => {
          signOut({
            callbackUrl: `${window.location.origin}`,
          });
        }}
      >
        sign out
      </span>
    </div>
  );
};

export default DashboardLayout;
