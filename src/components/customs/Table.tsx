import React, { FC } from "react";
import Status from "./Status";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface TableProps {
  titles?: string[];
  items?: { [key: string]: any }[];
  url?: string;
}

const Table: FC<TableProps> = ({
  titles = [
    // "Requester ID",
    "Requester",
    "Sample(s)",
    "Pickup Location",
    "Approved Date",
    "Logistics Company",
    "Pickup Date",
    "Destination Location(s)",
    "Delivery Date",
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
  url = "request",
}) => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div className="overflow-x-auto relative z-10">
      <table className="w-full">
        <thead className="w-full">
          <tr className="bg-[#098750]/20 rounded-md">
            <th className="px-2 py-4 whitespace-nowrap">S/N</th>
            {titles.map((title, i) => {
              return (
                <th key={i} className="px-2 py-4 whitespace-nowrap text-left">
                  {title}
                </th>
              );
            })}
            <th className="px-2 py-4 whitespace-nowrap text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {items.map((item, i) => {
            return (
              <tr
                className="border-b-[1px] border-[#D7D7D7] text-[#504F4F]"
                key={i + 1}
              >
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {i + 1}
                </td>
                {/* <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.requesterId.substr(0, 5)}
                </td> */}
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.requester}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.samples.map((sample) => sample.name).join(", ")}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.pickup}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.approver?.date &&
                    formatter.format(new Date(item.approver?.date))}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.logistics?.company}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.picker?.date &&
                    formatter.format(new Date(item.picker?.date))}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.destinations.join(", ")}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.dropper?.date &&
                    formatter.format(new Date(item.dropper?.date))}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  <Status status={item.status}>{item.status}</Status>
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {" "}
                  <Link href={`/dashboard-${url}/requests/${item._id}`}>
                    <FaEye />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
