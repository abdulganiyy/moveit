import React, { useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Table from "@/components/customs/Table";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import Axios from "axios";
import Image from "next/image";
import _ from "lodash";
import { FaDatabase } from "react-icons/fa";
import { useSession, getSession } from "next-auth/react";

const DashboardAdmin = ({ requests }) => {
  const { data: session } = useSession();

  // console.log(session);

  //   const requesterRequests = requests.filter(
  //     (request) => request.requesterId === session.user.uid
  //   );

  const approvedRequests = requests.filter(
    (request) => request.status === "approved"
  );

  return (
    <DashboardLayout
      homelink="/dashboard-admin"
      links={[
        { path: "/dashboard-admin", name: "Dashboard" },
        { path: "/dashboard-admin/transactions", name: "Transactions" },
        {
          path: "/dashboard-admin/settings",
          name: "Manage",
          icon: <FaDatabase />,
        },
      ]}
    >
      <div className="flex justify-between items-center mb-[41px]">
        <div>
          <p className="text-[#A8A8A8]">Welcome,</p>
          <p className="text-[20px] leading-[21px] font-medium">
            {session?.user?.firstName} {session?.user?.lastName}
          </p>
        </div>
        <div className="flex gap-x-2">
          {session?.user?.admin === true && (
            <>
              <ButtonLink href="/dashboard-admin/create-admin">
                Create Admin
              </ButtonLink>
              <ButtonLink href="/dashboard-admin/create-user">
                Create a user
              </ButtonLink>
            </>
          )}
          {/* <ButtonLink href="/dashboard-request/create-request">
            Request
          </ButtonLink> */}
        </div>
      </div>
      <div className="bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Requests</div>
        {requests.length === 0 ? (
          <div className="flex justify-center">
            <Image src="/emptystate.svg" alt="" width={70} height={70} />
          </div>
        ) : (
          <Table
            items={_.orderBy(
              requests.filter((req) => req.status === "submitted"),
              [(obj) => new Date(obj.createdAt)],
              ["desc"]
            )}
            url="admin"
            // items={new Array(5).fill({
            //   requesterId: "78220-25/23",
            //   requester: "Oluchi Musa",
            //   sample: "Chicken Pox",
            //   size: "0.12Kg",
            //   pickup: "Lagos State",
            //   destination: "Abuja",
            //   date: "25 Feb, 2022",
            //   status: "approved",
            // })}
          />
        )}
        <div className="flex justify-end py-5 px-5">
          <Link href="/dashboard-admin/transactions" className="underline">
            View All
          </Link>
        </div>
      </div>
      <div className="mt-[34px] bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Approval’s</div>
        {approvedRequests.length === 0 ? (
          <div className="flex justify-center">
            <Image src="/emptystate.svg" alt="" width={70} height={70} />
          </div>
        ) : (
          <Table
            items={approvedRequests}
            url="admin"
            // items={new Array(5).fill({
            //   requesterId: "78220-25/23",
            //   requester: "Oluchi Musa",
            //   sample: "Chicken Pox",
            //   size: "0.12Kg",
            //   pickup: "Lagos State",
            //   destination: "Abuja",
            //   date: "25 Feb, 2022",
            //   status: "approved",
            // })}
          />
        )}
        <div className="flex justify-end py-5 px-5">
          <Link href="/dashboard-admin/transactions" className="underline">
            View All
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!session.user.admin) {
    return {
      redirect: {
        destination: `/dashboard-${session.user.role}`,
        permanent: false,
      },
    };
  }

  const response = await Axios.get(
    `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
      context.req.headers.host
    }/api/requests`
  );
  const requests = response.data.data;
  // console.log(requests);

  return {
    props: { session, requests },
  };
}

export default DashboardAdmin;
