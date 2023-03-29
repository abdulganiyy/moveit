import React, { FC, useState } from "react";
import Status from "./Status";
import Link from "next/link";
import { FaEye, FaTrash } from "react-icons/fa";
import ConfirmBox from "@/components/customs/ConfirmBox";
import Axios from "axios";
import { useRouter } from "next/router";

interface TableProps {
  titles?: string[];
  items?: { [key: string]: any }[];
}

const Table: FC<TableProps> = ({
  titles = ["Name", "Region", "Role", "Organization", "Date"],
  items,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const deleteUser = async (id: string) => {
    // alert(id);
    try {
      await Axios.delete(`/api/users/${id}`);
      router.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <div className="overflow-x-auto relative z-10">
      <ConfirmBox
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={async () => {
          await deleteUser(id);
        }}
      />
      <table className="w-full">
        <thead className="w-full">
          <tr className="bg-[#098750]/20 rounded-md">
            <th className="px-2 py-4 whitespace-nowrap">S/N</th>
            {titles.map((title, i) => {
              return (
                <th
                  key={i + 1}
                  className="px-2 py-4 whitespace-nowrap text-left"
                >
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
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.firstName} {item.lastName}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.zones[0] || item.zone || "-"}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.role}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.role === "approver"
                    ? "NCDC"
                    : item.role === "requester"
                    ? "Laboratory"
                    : item.company}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  {item.createdAt
                    ? formatter.format(new Date(item.createdAt))
                    : formatter.format(new Date())}
                </td>
                <td className="text-left px-2 py-4 whitespace-nowrap">
                  <div className="flex gap-x-2">
                    <Link href={`/dashboard-admin/users/${item._id}`}>
                      <FaEye />
                    </Link>
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => {
                        setOpen(true);
                        setId(item._id);
                      }}
                    />
                  </div>
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
