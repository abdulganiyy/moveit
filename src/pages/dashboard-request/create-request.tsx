import React from "react";
import AuthLayout from "@/components/layouts.tsx/AuthLayout";
// import Select from "@/components/inputs/Select";
// import TextInput from "@/components/inputs/TextInput";
import { Formik, Form } from "formik";
import FormikInput from "@/components/inputs/FormikInput";
import FormikSelect from "@/components/inputs/FormikSelect";
import Button from "@/components/buttons/Button";

const CreateRequest = () => {
  return (
    <AuthLayout>
      <div className="p-4">
        <h2 className="px-[24px] py-[8px] inline-block text-[#1E1E1E] border-b-[.3px] border-r-[.3px] border-black rounded-md">
          Request Initiation
        </h2>
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <div className="pt-4 flex flex-col gap-y-8">
              <div className="flex justify-between gap-x-4">
                <div className="flex-auto">
                  <FormikSelect
                    name="Zone"
                    label="Zone"
                    placeholder="Zone"
                    options={["Zone 1", "Zone 2"]}
                  />
                </div>
                <div className="flex-auto">
                  <FormikSelect
                    name="State"
                    label="State"
                    placeholder="State"
                    options={["Lagos", "Oyo"]}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-x-4">
                <div className="flex-auto">
                  <FormikInput
                    name="requesterId"
                    label="Requester ID"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
                <div className="flex-auto">
                  <FormikInput
                    name="requester"
                    label="Requester"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-x-4">
                <div>
                  <FormikSelect
                    name="samples"
                    label="Samples"
                    options={["1", "2"]}
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
                <div>
                  <FormikInput
                    name="nos"
                    label="No of Samples"
                    className="md:w-[47px] p-0 h-[40px]"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-x-4">
                <div className="flex-auto">
                  <FormikInput
                    name="size"
                    label="Size (KG)"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
                <div className="flex-auto">
                  <FormikInput
                    name="numOfBoxes"
                    label="No of Boxes"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-x-4">
                <div className="flex-auto">
                  <FormikInput
                    name="destination"
                    label="Destination"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
                <div className="flex-auto">
                  <FormikInput
                    name="pickup"
                    label="Pickup Location"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between gap-x-4">
                <div className="flex-auto">
                  <FormikInput
                    name="contact"
                    label="Contact Person"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
                <div className="flex-auto">
                  <FormikInput
                    name="phone"
                    label="Contact Phone"
                    className="md:w-full p-0 h-[40px]"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-x-5">
                <Button className="w-[152px] h-[55px] flex justify-center items-center bg-[#098750] text-white border-[1px] border-[#E0E0E0] rounded-md ">
                  Submit
                </Button>
                <Button className="w-[152px] h-[55px] flex justify-center items-center bg-white text-[#098750] border-[1px] border-[#098750] rounded-md ">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default CreateRequest;
