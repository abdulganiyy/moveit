import React from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Table from "@/components/customs/Table";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import Axios from "axios";
import Image from "next/image";
import _ from "lodash";

import { useSession, getSession } from "next-auth/react";

const DashboardRequest = ({ requests }) => {
  const { data: session } = useSession();

  const logisticsRequests = requests.filter((request) =>
    //@ts-ignore
    session.user.zones?.includes(request.zone)
  );

  const approvedRequesterRequests = logisticsRequests.filter(
    (request) => request.status === "approved"
  );

  // _.orderBy(
  //   requests.filter((req) => req.status === "submitted"),
  //   [(obj) => new Date(obj.createdAt)],
  //   ["desc"]
  // )

  return (
    <DashboardLayout
      homelink="/dashboard-logistics"
      links={[
        { path: "/dashboard-logistics", name: "Dashboard" },
        { path: "/dashboard-logistics/transactions", name: "Transactions" },
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
          {/* <ButtonLink href="/dashboard-request/create-request">
            Request
          </ButtonLink> */}
        </div>
      </div>
      <div className="bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Requests</div>
        <Table
          items={_.orderBy(
            logisticsRequests.filter((req) => req.status === "approved"),
            [(obj) => new Date(obj.createdAt)],
            ["desc"]
          )}
          url="logistics"
        />
        <div className="flex justify-end py-5 px-5">
          <Link href="/dashboard-logistics/transactions" className="underline">
            View All
          </Link>
        </div>
      </div>
      <div className="mt-[34px] bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2">Recent Approval’s</div>
        {approvedRequesterRequests.length === 0 ? (
          <div className="flex justify-center">
            <Image src="/emptystate.svg" alt="" width={70} height={70} />
          </div>
        ) : (
          <Table
            items={_.orderBy(
              approvedRequesterRequests.filter(
                (req) => req.status !== "approved"
              ),
              [(obj) => new Date(obj.createdAt)],
              ["desc"]
            )}
            url="logistics"
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
          <Link href="/dashboard-logistics/transactions" className="underline">
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

  // if (session.user.admin) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard-admin",
  //       permanent: false,
  //     },
  //   };
  // }

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

export default DashboardRequest;
