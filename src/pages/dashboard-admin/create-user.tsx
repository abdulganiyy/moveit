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
import { toast } from "react-toastify";
import { useSession, getSession } from "next-auth/react";
import { FaDatabase } from "react-icons/fa";

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().required(),
  zone: yup.string(),
  zones: yup.array(),
  company: yup.string(),
  phoneNumber: yup.string().required(),
});

const CreateUser = ({ logisticsList }) => {
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
            role: "",
            email: "",
            password: "",
            zone: "",
            zones: [""],
            company: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, submitProps) => {
            // alert(JSON.stringify(values));
            try {
              const response = await Axios.post("/api/createuser", values, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              toast("User created successfully", {
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
          {({ values: { role }, isSubmitting, isValid }) => {
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
                    <FormikSelect
                      name="role"
                      label="Role"
                      options={[
                        "requester",
                        "approver",
                        "logistics",
                        "pickup-personel",
                        "dropoff-personel",
                      ]}
                    />
                  </div>
                  {role == "requester" && (
                    <div className="flex-auto">
                      <FormikSelect
                        name="zone"
                        label="Zone"
                        placeholder="Zone"
                        options={[
                          "North Central",
                          "North East",
                          "North West",
                          "South East",
                          "South West",
                          "South South",
                        ]}
                      />
                    </div>
                  )}
                  {role == "logistics" && (
                    <div className="flex-auto">
                      <FormikSelect
                        name="company"
                        label="Company Name"
                        placeholder="Company Name"
                        options={logisticsList.map((company) => company.name)}
                      />
                    </div>
                  )}
                  {role == "pickup-personel" && (
                    <div className="flex-auto">
                      <FormikSelect
                        name="company"
                        label="Company Name"
                        placeholder="Company Name"
                        options={logisticsList.map((company) => company.name)}
                      />
                    </div>
                  )}
                  {role == "dropoff-personel" && (
                    <div className="flex-auto">
                      <FormikSelect
                        name="company"
                        label="Company Name"
                        placeholder="Company Name"
                        options={logisticsList.map((company) => company.name)}
                      />
                    </div>
                  )}
                  {role == "logistics" && (
                    <div>
                      <FieldArray name="zones">
                        {(fieldArrayProps) => {
                          const { form, push, pop } = fieldArrayProps;
                          const { values } = form;
                          const { zones } = values;

                          return (
                            <div>
                              <div>Zones</div>
                              <div className="flex flex-col gap-y-4">
                                {zones.map((sample: any, i: number) => (
                                  <FormikSelect
                                    key={i}
                                    name={`zones[${i}]`}
                                    options={[
                                      "North Central",
                                      "North East",
                                      "North West",
                                      "South East",
                                      "South West",
                                      "South South",
                                    ]}
                                    placeholder="Zone"
                                    // className="md:w-full p-0 md:h-[40px]"
                                  />
                                ))}
                              </div>
                              <div className="flex justify-end gap-x-2">
                                {zones.length > 1 && (
                                  <button
                                    onClick={() => pop()}
                                    className="text-green-700 underline"
                                  >
                                    Remove
                                  </button>
                                )}
                                <button
                                  onClick={() => push("")}
                                  className="text-green-700 underline"
                                >
                                  Add more zones +
                                </button>
                              </div>
                            </div>
                          );
                        }}
                      </FieldArray>
                      {/* <FormikSelect
                      name="sample"
                      label="Sample"
                      options={["Malaria", "Typhoid", "Malaria"]}
                      placeholder="Sample"
                      className="md:w-full p-0 md:h-[40px]"
                    /> */}
                    </div>
                  )}
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
                  <div>
                    <FormikInput
                      name="phoneNumber"
                      label="Phone Number"
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
                      Create a user
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

  const resp = await Axios.get(
    `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
      context.req.headers.host
    }/api/logistics`
  );
  const logisticsList = resp.data.data;
  console.log(logisticsList.length);

  return {
    props: { session, logisticsList },
  };
}

export default CreateUser;

// [
//   "Gig Logistics",
//   "Young shall grow Logistics",
//   "God is Good Logistics",
//   "Bonnyface Transport",
//   "Peace Mass Logistics",
//   "Poshex Logistics",
//   "Abuja Logistics",
// ]
