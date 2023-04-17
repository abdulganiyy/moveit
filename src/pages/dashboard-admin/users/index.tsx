import React, { useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import UserTable from "@/components/customs/UserTable";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import DropDown from "@/components/customs/DropDown";
import { BsFunnel } from "react-icons/bs";
import { FaSort, FaSearch, FaDatabase } from "react-icons/fa";
import TextInput from "@/components/inputs/TextInput";
import _ from "lodash";
import Axios from "axios";
import Image from "next/image";
import { CSVLink } from "react-csv";
import { CSVHeaders } from "@/utils";

import { useSession, getSession } from "next-auth/react";

const Users = ({ users }) => {
  const { data: session } = useSession();
  // console.log(session);

  const data = users.filter((user) => !user.admin);

  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 15;

  let results = data;

  if (query !== "") {
    results = results.filter((item) =>
      item.firstName.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter !== "") {
    results = results.filter((item) =>
      filter === "all" ? true : item.role === filter
    );
  }

  if (sort !== "") {
    results = sort === "all" ? results : _.sortBy(results, "firstName");
  }

  const totalPages = Math.ceil(results.length / transactionsPerPage);

  const start = transactionsPerPage * (currentPage - 1);
  const end = start + transactionsPerPage;

  results = results.slice(start, end);

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

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
          <p className="text-[20px] leading-[21px] font-medium">Transactions</p>
        </div>
        {session?.user?.admin === true && (
          <ButtonLink href="/dashboard-admin/create-user">
            Create a user
          </ButtonLink>
        )}
      </div>
      <div className="bg-white p-2 py-[20px] rounded-[5px]">
        <div className="mb-2 flex justify-between items-center">
          <span>All Transactions</span>
          <div className="flex gap-x-4 items-center">
            <TextInput
              placeholder="Search"
              icon={<FaSearch color="#BDBDBD" />}
              direction="right"
              className="w-[200px] h-[32px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <DropDown
              icon={<BsFunnel />}
              value={filter}
              setValue={setFilter}
              items={[
                "all",
                "requester",
                "approver",
                "logistics",
                "pickup-personel",
                "dropoff-personel",
              ]}
            />
            <DropDown
              icon={<FaSort />}
              value={sort}
              setValue={setSort}
              items={["all", "name"]}
            />
            {/* <CSVLink
              data={results.map((result) => ({
                requester: result.requester,
                sample: result.samples[0],
                phone: result.requesterPhoneNumber,
                pickup: result.pickup,
                destination: result.destinations[0],
                createdAt: formatter.format(new Date(result.createdAt)),
                status: result.status,
              }))}
              headers={CSVHeaders}
            >
              Export
            </CSVLink> */}
          </div>
        </div>
        <UserTable items={results} />
        <div className="flex justify-end py-5 px-5 gap-x-2">
          {new Array(totalPages).fill(0).map((_page, i) => (
            <span
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`flex items-center justify-center w-[30px] h-[30px] border-[1px] border-gray-300 cursor-pointer rounded-md ${
                currentPage === i + 1 ? "bg-[#098750] text-white" : ""
              }`}
            >
              {i + 1}
            </span>
          ))}
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

  const response = await Axios.get(
    `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
      context.req.headers.host
    }/api/users`
  );
  const users = response.data.data;
  // console.log(users);

  return {
    props: { session, users },
  };
}

export default Users;
