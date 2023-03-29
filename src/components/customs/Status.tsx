import React, { FC, ReactNode } from "react";
import { GeneralObject } from "@/types";

interface StatusProps {
  status: string;
  children: ReactNode;
}

const Status: FC<StatusProps> = ({ status, children }) => {
  const statuses: GeneralObject = {
    pending: "bg-[#FFA349]/20 before:bg-[#FFA349]",
    submitted: "bg-[#FFA349]/20 before:bg-[#FFA349]",
    approved: "bg-[#4DBC73]/20 before:bg-[#4DBC73]",
    declined: "bg-[#FF0000]/20 before:bg-[#FF0000]",
    assigned: "bg-[#4DBC73]/20 before:bg-[#4DBC73]",
    rejected: "bg-[#FF0000]/20 before:bg-[#FF0000]",
    intransit: "bg-[#4DBC73]/20 before:bg-[#4DBC73]",
    completed: "bg-[#0047FF]/20 before:bg-[#0047FF]",
  };

  return (
    <span
      className={`relative before:rounded-full before:w-[6px] before:h-[6px] before:inline-block px-[6px] px-[3px] flex items-center justify-center gap-x-[4px] capitalize rounded-[14px] ${statuses[status]}`}
    >
      {children}
    </span>
  );
};

export default Status;
