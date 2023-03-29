import React, { useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Table from "@/components/customs/Table";
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
import { CSVReqHeaders } from "@/utils";
import { DateRangePicker } from "react-date-range";
import { useSession, getSession } from "next-auth/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Transactions = ({ requests }) => {
  const { data: session } = useSession();
  // console.log(session);
  const transactions = requests;

  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [to, setTo] = useState<any>("");
  const [from, setFrom] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 15;

  // const handleSelect = (date) => {
  //   setFrom(date.selection.startDate);
  //   setTo(date.selection.endDate);
  // };

  // const selectionRange = {
  //   startDate: from,
  //   endDate: to,
  //   key: "selection",
  // };

  let results = transactions;

  if (query !== "") {
    results = results.filter((item) =>
      item._id.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (from !== "" && to !== "") {
    results = results.filter((item) => {
      const itemDate = new Date(item.createdAt).getDate();

      if (
        itemDate === new Date(from).getDate() &&
        itemDate === new Date(to).getDate()
      )
        return itemDate === new Date(from).getDate();

      return (
        itemDate >= new Date(from).getDate() &&
        itemDate <= new Date(to).getDate()
      );
    });
  }

  if (filter !== "") {
    results = results.filter((item) =>
      filter === "all" ? true : item.status === filter
    );
  }

  if (sort !== "") {
    results = sort === "all" ? results : _.sortBy(results, sort);
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
      // links={[
      //   { path: "/dashboard-admin", name: "Dashboard" },
      //   { path: "/dashboard-admin/transactions", name: "Transactions" },
      //   {
      //     path: "/dashboard-admin/create-logistics",
      //     name: "Add Logistics Company",
      //   },
      //   {
      //     path: "/dashboard-admin/users",
      //     name: "Users",
      //   },
      //   {
      //     path: "/dashboard-admin/logistics",
      //     name: "Logistics",
      //   },
      // ]}
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
            <div>
              <label className="mr-1">From</label>
              <input
                type="date"
                placeholder="from"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                }}
                className="border-gray-300 outline-0 border-2 p-2 rounded-md cursor-pointer"
              />
            </div>
            <div>
              <label className="mr-1">To</label>
              <input
                type="date"
                placeholder="to"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                className="border-gray-300 outline-0 border-2 p-2 rounded-md cursor-pointer"
              />
            </div>
            {/* <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            /> */}

            <DropDown
              icon={<BsFunnel />}
              value={filter}
              setValue={setFilter}
              items={[
                "all",
                "submitted",
                "declined",
                "approved",
                "rejected",
                "assigned",
                "completed",
                "intransit",
              ]}
            />
            <DropDown
              icon={<FaSort />}
              value={sort}
              setValue={setSort}
              items={["all", "requester", "size"]}
            />
            <CSVLink
              data={results.map((result) => ({
                requester: result.requester,
                sample: result.samples.map((sample) => sample.name).join(", "),
                pickup: result.pickup,
                approvedDate: result.approver?.date,
                company: result.logistics?.company,
                pickupDate: result.picker?.date,
                destination: result.destinations.join(", "),
                deliveryDate: result.dropper?.date,
                status: result.status,
              }))}
              headers={CSVReqHeaders}
              filename={"request-report.csv"}
              target="_blank"
            >
              Export
            </CSVLink>
          </div>
        </div>
        <Table items={results} url="admin" />
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
    }/api/requests`
  );
  const requests = response.data.data;
  // console.log(requests);

  return {
    props: { session, requests },
  };
}

export default Transactions;
