import React, { useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import Table from "@/components/customs/Table";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import DropDown from "@/components/customs/DropDown";
import { BsFunnel } from "react-icons/bs";
import { FaSort, FaSearch } from "react-icons/fa";
import TextInput from "@/components/inputs/TextInput";
import _ from "lodash";

const Transactions = () => {
  const [transactions] = useState(
    new Array(10)
      .fill([
        {
          requesterId: "78220-25/23",
          requester: "Ibrahim Amar",
          sample: "Malaria",
          size: "1Kg",
          pickup: "Lagos State",
          destination: "Abuja",
          date: "22 Feb, 2023",
          status: "pending",
        },
        {
          requesterId: "78387-20/23",
          requester: "Idris Ali",
          sample: "Typhoid",
          size: "0.28Kg",
          pickup: "Lagos State",
          destination: "Abuja",
          date: "20 Feb, 2023",
          status: "declined",
        },
        {
          requesterId: "78220-25/23",
          requester: "Oluchi Musa",
          sample: "Chicken Pox",
          size: "0.12Kg",
          pickup: "Lagos State",
          destination: "Abuja",
          date: "25 Feb, 2022",
          status: "completed",
        },
        {
          requesterId: "78220-25/23",
          requester: "Oluchi Musa",
          sample: "Chicken Pox",
          size: "0.12Kg",
          pickup: "Lagos State",
          destination: "Abuja",
          date: "25 Feb, 2022",
          status: "approved",
        },
      ])
      .flat()
  );

  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 15;

  let results = transactions;

  if (query !== "") {
    results = results.filter((item) =>
      item.requester.toLowerCase().includes(query.toLowerCase())
    );
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

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-[41px]">
        <div>
          <p className="text-[20px] leading-[21px] font-medium">Transactions</p>
        </div>
        <ButtonLink href="/dashboard-request/create-request">
          Request
        </ButtonLink>
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
              items={["all", "pending", "declined", "approved", "completed"]}
            />
            <DropDown
              icon={<FaSort />}
              value={sort}
              setValue={setSort}
              items={["all", "requester", "size"]}
            />
          </div>
        </div>
        <Table items={results} />
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

export default Transactions;
