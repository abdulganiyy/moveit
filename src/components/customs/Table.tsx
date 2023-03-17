import React, { FC } from "react";
import Status from "./Status";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface TableProps {
  titles?: string[];
  items?: { [key: string]: any }[];
}

const Table: FC<TableProps> = ({
  titles = [
    "Requester ID",
    "Requester",
    "Sample",
    "Size",
    "Pickup",
    "Destination",
    "Date",
    "Status",
  ],
  items = new Array(5).fill({
    requesterId: "78220-25/23",
    requester: "Oluchi Musa",
    sample: "Chicken Pox",
    size: "0.12Kg",
    pickup: "Lagos State",
    destination: "Abuja",
    date: "25 Feb, 2022",
    status: "pending",
  }),
}) => {
  return (
    <div className="overflow-x-auto relative z-10">
      <table className="w-full">
        <thead>
          <tr className="bg-[#098750]/20 rounded-md">
            <th className="px-2 py-4">S/N</th>
            {titles.map((title, i) => {
              return (
                <th key={i} className="px-2 py-4 text-left">
                  {title}
                </th>
              );
            })}
            <th className="px-2 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            return (
              // <Link href="dashboard-request/request-details">
              <tr
                className="border-b-[1px] border-[#D7D7D7] text-[#504F4F]"
                key={i}
              >
                <td className="text-left px-2 py-4">{i}</td>
                <td className="text-left px-2 py-4">{item.requesterId}</td>
                <td className="text-left px-2 py-4">{item.requester}</td>
                <td className="text-left px-2 py-4">{item.sample}</td>
                <td className="text-left px-2 py-4">{item.size}</td>
                <td className="text-left px-2 py-4">{item.pickup}</td>
                <td className="text-left px-2 py-4">{item.destination}</td>
                <td className="text-left px-2 py-4">{item.date}</td>
                <td className="text-left px-2 py-4">
                  <Status status={item.status}>{item.status}</Status>
                </td>
                <td className="text-left px-2 py-4">
                  {" "}
                  <Link href="dashboard-request/request-details">
                    <FaEye />
                  </Link>
                </td>
              </tr>
              // </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
