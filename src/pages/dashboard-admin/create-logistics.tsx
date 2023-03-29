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
import { FaDatabase } from "react-icons/fa";

const validationSchema = yup.object({
  name: yup.string().required(),
});

const CreateLogistics = () => {
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
      <div className="bg-white p-2 rounded-md max-w-[700px] mx-auto">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, submitProps) => {
            // alert(JSON.stringify(values));
            try {
              await Axios.post("/api/logistics", values, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              toast("Company name created successfully", {
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
            } finally {
              submitProps.setSubmitting(false);
              submitProps.resetForm();
            }
          }}
        >
          {({ isSubmitting, isValid }) => {
            return (
              <Form>
                <div className="flex flex-col gap-y-8">
                  <div>
                    <FormikInput
                      name="name"
                      label="Logistics Company Name"
                      className="md:w-full p-0 md:md:h-[40px]"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={!isValid || isSubmitting}
                      className="w-[152px] h-[55px] flex justify-center items-center bg-[#098750] text-white border-[1px] border-[#E0E0E0] rounded-md "
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

export default CreateLogistics;
