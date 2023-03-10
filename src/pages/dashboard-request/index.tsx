import React from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Table from "@/components/customs/Table";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";

const DashboardRequest = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-[41px]">
        <div>
          <p className="text-[#A8A8A8]">Welcome,</p>
          <p className="text-[20px] leading-[21px] font-medium">Jasmine Moon</p>
        </div>
        <ButtonLink href="/dashboard-request/create-request">
          Request
        </ButtonLink>
      </div>
      <div className="bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Requests</div>
        <Table />
        <div className="flex justify-end py-5 px-5">
          <Link href="/dashboard-request" className="underline">
            View All
          </Link>
        </div>
      </div>
      <div className="mt-[34px] bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Approval’s</div>
        <Table
          items={new Array(5).fill({
            requesterId: "78220-25/23",
            requester: "Oluchi Musa",
            sample: "Chicken Pox",
            size: "0.12Kg",
            pickup: "Lagos State",
            destination: "Abuja",
            date: "25 Feb, 2022",
            status: "approved",
          })}
        />
        <div className="flex justify-end py-5 px-5">
          <Link href="/dashboard-request" className="underline">
            View All
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardRequest;
