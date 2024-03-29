import React from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
// import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import FormikInput from "@/components/inputs/FormikInput";
// import FormikSelect from "@/components/inputs/FormikSelect";
import Button from "@/components/buttons/Button";
import Axios from "axios";
import { toast } from "react-toastify";
import { useSession, getSession } from "next-auth/react";
import { FaDatabase, FaTrash } from "react-icons/fa";

const CreateLogistics = ({ logisticsList }) => {
  const deleteLogistics = async (name: string) => {
    try {
      await Axios.delete(`/api/logistics?name=${name}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      toast("Logistics company deleted successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    } catch (error) {
      toast(error.response.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };
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
          <p className="text-[#A8A8A8]">
            <Link href="/dashboard-admin">Go Back</Link>
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md flex flex-col gap-y-4 max-w-[700px] mx-auto">
        {logisticsList.map((company, i) => (
          <div key={i} className="flex w-full justify-between items-center">
            {company.name}
            <span
              onClick={() => deleteLogistics(company.name)}
              className="cursor-pointer"
            >
              <FaTrash />
            </span>
          </div>
        ))}
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

  const resp = await Axios.get(
    `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
      context.req.headers.host
    }/api/logistics`
  );
  const logisticsList = resp.data.data;
  //   console.log(logisticsList.length);

  return {
    props: { session, logisticsList },
  };
}

export default CreateLogistics;
