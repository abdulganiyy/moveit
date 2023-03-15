import React, { ReactNode, FC, useEffect, useState } from "react";
import Image from "next/image";
import { isMobile } from "mobile-device-detect";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

const DashboardLayoutWrapper: FC<DashboardLayoutWrapperProps> = ({
  children,
}) => {
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
  return <div>{children}</div>;
};

export default DashboardLayoutWrapper;
