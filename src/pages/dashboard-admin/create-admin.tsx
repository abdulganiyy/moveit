import React from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import ButtonLink from "@/components/links/ButtonLink";
import Link from "next/link";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import FormikInput from "@/components/inputs/FormikInput";
import FormikSelect from "@/components/inputs/FormikSelect";
import Button from "@/components/buttons/Button";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSession, getSession } from "next-auth/react";
import { FaDatabase } from "react-icons/fa";

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const CreateAdmin = () => {
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, submitProps) => {
            // alert(JSON.stringify(values));
            try {
              const response = await Axios.post("/api/signup", values, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              toast("An admin created successfully", {
                hideProgressBar: true,
                autoClose: 2000,
                type: "success",
              });
            } catch (error) {
              toast("Invalid credentials", {
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
                      name="firstName"
                      label="First Name"
                      className="md:w-full p-0 md:md:h-[40px]"
                    />
                  </div>
                  <div>
                    <FormikInput
                      name="lastName"
                      label="last Name"
                      className="md:w-full p-0 md:md:h-[40px]"
                    />
                  </div>
                  <div>
                    <FormikInput
                      name="email"
                      label="Email"
                      className="md:w-full p-0 md:md:h-[40px]"
                    />
                  </div>
                  <div>
                    <FormikInput
                      name="password"
                      label="Password"
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
                      Create admin
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

export default CreateAdmin;
