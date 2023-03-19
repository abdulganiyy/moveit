import React from "react";
import AuthLayout from "@/components/layouts.tsx/AuthLayout";
// import Select from "@/components/inputs/Select";
// import TextInput from "@/components/inputs/TextInput";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import FormikInput from "@/components/inputs/FormikInput";
import FormikSelect from "@/components/inputs/FormikSelect";
import Checkbox from "@/components/inputs/Checkbox";
import Button from "@/components/buttons/Button";
import DashboardLayoutWrapper from "@/components/layouts.tsx/DashboardLayoutWrapper";
import { useSession } from "next-auth/react";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const validationSchema = yup.object({
  zone: yup.string().required(),
  state: yup.string().required(),
  requesterId: yup.string().required(),
  requester: yup.string().required(),
  samples: yup.array().required(),
  numOfSamples: yup.number().required(),
  properPackage: yup
    .boolean()
    .required("check if the sample is properly packaged"),
  requesterPhoneNumber: yup.string().required(),
  numOfBoxes: yup.number().required(),
  destinations: yup.array().required(),
  pickup: yup.string().required(),
  contact: yup.string().required(),
  phoneNumber: yup.string().required(),
});

const CreateRequest = () => {
  const { data: session } = useSession();

  return (
    <DashboardLayoutWrapper>
      <AuthLayout>
        <div className="p-4">
          <h2 className="px-[24px] py-[8px] inline-block text-[#1E1E1E] border-b-[.3px] border-r-[.3px] border-black rounded-md">
            Request Initiation
          </h2>
          <Formik
            initialValues={{
              zone: "",
              state: "",
              requesterId: session?.user?.uid,
              requester:
                session?.user?.firstName + " " + session?.user?.lastName,
              samples: [""],
              numOfSamples: undefined,
              properPackage: undefined,
              size: undefined,
              numOfBoxes: undefined,
              destinations: [""],
              pickup: "",
              contact: "",
              phoneNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="pt-4 flex flex-col gap-y-8">
                    <div className="flex justify-between gap-x-4">
                      <div className="flex-auto">
                        <FormikSelect
                          name="zone"
                          label="Zone"
                          placeholder="Zone"
                          options={[
                            "North Central",
                            "North CEast",
                            "North West",
                            "South East",
                            "South West",
                            "South South",
                          ]}
                        />
                      </div>
                      <div className="flex-auto">
                        <FormikSelect
                          name="state"
                          label="State"
                          placeholder="State"
                          options={states}
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-x-4">
                      <div className="flex-auto">
                        <FormikInput
                          name="requesterId"
                          label="Requester ID"
                          className="md:w-full p-0 md:md:h-[40px]"
                        />
                      </div>
                      <div className="flex-auto">
                        <FormikInput
                          name="requester"
                          label="Requester"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-x-4">
                      <div>
                        <FieldArray name="samples">
                          {(fieldArrayProps) => {
                            const { form, push, pop } = fieldArrayProps;
                            const { values } = form;
                            const { samples } = values;

                            return (
                              <div>
                                <div>Samples</div>
                                <div className="flex flex-col gap-y-4">
                                  {samples.map((sample: any, i: number) => (
                                    <FormikSelect
                                      key={i}
                                      name={`samples[${i}]`}
                                      options={[
                                        "Malaria",
                                        "Typhoid",
                                        "Malaria",
                                      ]}
                                      placeholder="Sample"
                                      className="md:w-full p-0 md:h-[40px]"
                                    />
                                  ))}
                                </div>
                                <div className="flex justify-end gap-x-2">
                                  {samples.length > 1 && (
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
                                    Add more samples +
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
                      <div>
                        <FormikInput
                          name="numOfSamples"
                          type="number"
                          label="No of Samples"
                          className="md:w-[100px] p-0 md:h-[40px]"
                        />
                      </div>
                    </div>
                    <div>
                      <Checkbox name="properPackage" />
                    </div>
                    <div className="w-full flex justify-between gap-x-4">
                      <div className="flex-auto">
                        <FormikInput
                          name="requesterPhoneNumber"
                          // type="number"
                          label="Requester Phone Number"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                      <div className="flex-auto">
                        <FormikInput
                          name="numOfBoxes"
                          type="number"
                          label="No of Boxes"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-x-4">
                      <div className="flex-auto">
                        <FormikInput
                          name="pickup"
                          label="Pickup Location"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                      <div className="flex-auto">
                        <FieldArray name="destinations">
                          {(fieldArrayProps) => {
                            console.log(fieldArrayProps);
                            const { form, push, pop } = fieldArrayProps;
                            const { values } = form;
                            const { destinations } = values;

                            return (
                              <div>
                                <div>Destinations</div>
                                <div className="flex flex-col gap-y-4">
                                  {destinations.map(
                                    (destination: any, i: number) => (
                                      <FormikInput
                                        key={i}
                                        name={`destinations[${i}]`}
                                        // label="Destination"
                                        className="md:w-full p-0 md:h-[40px]"
                                      />
                                    )
                                  )}
                                </div>
                                <div className="flex justify-end gap-x-2">
                                  {destinations.length > 1 && (
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
                                    Add more destinations +
                                  </button>
                                </div>
                              </div>
                            );
                          }}
                        </FieldArray>
                        {/* <FormikInput
                          name="destination"
                          label="Destination"
                          className="md:w-full p-0 md:h-[40px]"
                        /> */}
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-x-4">
                      <div className="flex-auto">
                        <FormikInput
                          name="contact"
                          label="Destination Contact Person"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                      <div className="flex-auto">
                        <FormikInput
                          name="phoneNumber"
                          type="number"
                          label="Destination Contact Phone"
                          className="md:w-full p-0 md:h-[40px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-x-5">
                      <Button
                        type="submit"
                        className="w-[152px] h-[55px] flex justify-center items-center bg-[#098750] text-white border-[1px] border-[#E0E0E0] rounded-md "
                      >
                        Submit
                      </Button>
                      <Button className="w-[152px] h-[55px] flex justify-center items-center bg-white text-[#098750] border-[1px] border-[#098750] rounded-md ">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </AuthLayout>
    </DashboardLayoutWrapper>
  );
};

export default CreateRequest;
