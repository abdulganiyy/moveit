import React, { useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Link from "next/link";
import {
  FaUserPlus,
  FaUsers,
  FaUserTie,
  FaUsersCog,
  FaDatabase,
} from "react-icons/fa";

import { getSession } from "next-auth/react";

const Settings = () => {
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
      <div className="flex gap-x-4 mb-[41px]">
        <Link
          href="/dashboard-admin/create-user"
          className="w-28 h-28 bg-white p-2 rounded-md flex flex-col justify-center items-center text-center"
        >
          <FaUserPlus size={30} />
          Create User
        </Link>
        <Link
          href="/dashboard-admin/create-logistics"
          className="w-28 h-28 bg-white p-2 rounded-md flex flex-col justify-center items-center text-center"
        >
          <FaUserTie size={30} />
          Add Logistics Company
        </Link>
        <Link
          href="/dashboard-admin/users"
          className="w-28 h-28 bg-white p-2 rounded-md flex flex-col justify-center items-center text-center"
        >
          <FaUsers size={30} />
          Users
        </Link>
        <Link
          href="/dashboard-admin/logistics"
          className="w-28 h-28 bg-white p-2 rounded-md flex flex-col justify-center items-center text-center"
        >
          <FaUsersCog size={30} />
          Logistics Companies
        </Link>
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

  return {
    props: { session },
  };
}

export default Settings;
