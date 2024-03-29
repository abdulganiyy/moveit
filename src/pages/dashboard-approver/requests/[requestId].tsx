import React, { FC, useState } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import DashboardLayoutWrapper from "@/components/layouts.tsx/DashboardLayoutWrapper";
import { useSession, getSession } from "next-auth/react";
import Axios from "axios";
import Status from "@/components/customs/Status";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import FormikTextArea from "@/components/inputs/FormikTextArea";
import * as yup from "yup";

const Detail: FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div>
      <div className="text-[#968DA6] text-[10px] leading-[12px] font-semibold">
        {title}
      </div>
      <div className="text-[12px] leading-[14px] mt-[4px]">{value}</div>
    </div>
  );
};

// const validationSchema = yup.object({
//   comment: yup.string().required(),
// });

const RequestDetails = ({ request }) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  const [comment, setComment] = useState("");

  const updateRequest = async (status: string) => {
    try {
      setLoading(true);
      await Axios.patch(
        `/api/requests/${router.query.requestId}?role=approver`,
        {
          status,
          fullName: `${session.user.firstName} ${session.user.lastName}`,
          email: session.user?.email,
          userId: session.user.uid,
          comment,
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
      router.reload();
    }
  };
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

  return (
    <DashboardLayoutWrapper>
      <DashboardLayout
        homelink="/dashboard-approver"
        links={[
          { path: "/dashboard-approver", name: "Dashboard" },
          { path: "/dashboard-approver/transactions", name: "Transactions" },
        ]}
      >
        <div className="min-h-[586px]">
          <div className="flex justify-between items-center mb-[41px]">
            <div>
              <p className="text-[20px] leading-[21px] font-medium">
                Request Details
              </p>
            </div>
          </div>
          <div className="px-[77px] py-[25px] bg-white rounded-[5px] overflow-x-hidden">
            <div className="relative z-10">
              <span className="inline-block px-[12px] py-[8px] border-b-[2px] border-[#098750] text-[#098750]">
                Request Details
              </span>
            </div>
            <div className="h-[2px] bg-[#EBEBEB] relative z-0 -translate-y-[2px]"></div>
            <div className="mt-[35px] flex flex-col gap-y-[55px]">
              <div className="grid grid-cols-3">
                <Detail title="Requester ID" value={request._id.substr(0, 5)} />
                <Detail title="Requester" value={request.requester} />
                <Detail
                  title="Sample(s)"
                  value={request.samples
                    .map((sample) => sample.name)
                    .join(", ")}
                />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="Zone" value={request.zone} />
                <Detail title="No of Sample" value={request.samples.length} />
                <Detail title="No Of Boxes" value={request.numOfBoxes} />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="State" value={request.state} />
                <Detail title="Pickup Location" value={request.pickup} />
                <Detail
                  title="Destination(s)"
                  value={request.destinations
                    .map((destination) => destination)
                    .join(", ")}
                />
              </div>
              <div className="grid grid-cols-3">
                {request.size && <Detail title="Size" value={request.size} />}
                <Detail
                  title="Date"
                  value={formatter.format(new Date(request.createdAt))}
                />
                <Detail title="Contact Person" value={request.contact} />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="Contact Phone" value={request.phoneNumber} />
                <div className="relative">
                  <div className="absolute top-0 left-0 w-[800px] font-medium text-[14px] leading-[17px]">
                    Is/are the sample(s) properly packaged using NCDC approved
                    transport box(es)? {request.properPackage}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white py-[31px] px-[74px] rounded-[5px]">
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-[296px] border-[1px] border-[#B3B3B3] rounded-[5px] outline-0 p-2"
            ></textarea>
          </div>
          {request.approver?.fullName && (
            <div className="mt-4 bg-white py-[31px] px-[74px] rounded-[5px]">
              <h4>Approval</h4>
              <div className="flex gap-x-[130px]">
                <Detail
                  title="Date"
                  value={formatter.format(new Date(request.approver?.date))}
                />
                <Detail
                  title="Name of Approver"
                  value={request.approver?.fullName}
                />
              </div>
              <div className="mt-[27px] flex gap-x-[130px]">
                <div>
                  <div className="text-[#968DA6] text-[10px] leading-[12px] font-semibold">
                    Comment
                  </div>
                  <div className="w-[287px] h-[43px] border-[.5px] border-[#B3B3B3] rounded-[5px] p-2">
                    {request.approver?.comment}
                  </div>
                </div>
                <Status status={request.approver?.status}>
                  {request.approver?.status}
                </Status>
              </div>
            </div>
          )}
          {request.logistics?.fullName && (
            <div className="mt-4 bg-white py-[31px] px-[74px] rounded-[5px]">
              <h4>Pickup</h4>
              <div className="flex gap-x-[130px]">
                <Detail
                  title="Released by;"
                  value={request.logistics?.fullName}
                />
                <Detail
                  title="To be Picked up by;"
                  value={request.picker?.fullName}
                />
              </div>
              <div className="mt-[27px] flex gap-x-[130px]">
                <div>
                  <div className="text-[#968DA6] text-[10px] leading-[12px] font-semibold">
                    Comment
                  </div>
                  <div className="w-[287px] h-[43px] border-[.5px] border-[#B3B3B3] rounded-[5px] p-2">
                    {request.logistics?.comment}
                  </div>
                </div>
              </div>
            </div>
          )}
          {request.status === "completed" && (
            <div className="mt-4 bg-white py-[31px] px-[74px] rounded-[5px]">
              <h4>Delivered</h4>
              <div className="flex gap-x-[130px]">
                <Detail
                  title="Received by;"
                  value={request.dropper?.fullName}
                />
              </div>
              <div className="mt-[27px] flex gap-x-[130px]">
                <div>
                  <div className="text-[#968DA6] text-[10px] leading-[12px] font-semibold">
                    Comment
                  </div>
                  <div className="w-[287px] h-[43px] border-[.5px] border-[#B3B3B3] rounded-[5px] p-2">
                    {request.dropper?.comment}
                  </div>
                </div>
              </div>
            </div>
          )}
          {request.status === "submitted" && (
            <div className="mt-4 flex justify-end gap-x-4">
              <Button
                onClick={() => updateRequest("approved")}
                isLoading={loading}
                disabled={loading}
                className="w-[152px] h-[55px] flex justify-center items-center bg-[#098750] text-white border-[1px] border-[#E0E0E0] rounded-md "
              >
                Approve
              </Button>
              <Button
                onClick={() => updateRequest("declined")}
                isLoading={load}
                disabled={load}
                className="w-[152px] h-[55px] flex justify-center items-center bg-white text-[#FF0000] border-[1px] border-[#FF0000] rounded-md "
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      </DashboardLayout>
    </DashboardLayoutWrapper>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(context.req.headers.host);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await Axios.get(
    `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
      context.req.headers.host
    }/api/requests/${context.params.requestId}`
  );
  const request = response.data.data;
  // console.log(request);

  return {
    props: { session, request },
  };
}

export default RequestDetails;

{
  /* <Formik
              initialValues={{ comment: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, submitProps) => {
                try {
                  await Axios.patch(
                    `/api/requests/addcomment?role=approver&id=${router.query.requestId}`,
                    values,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  toast("Comment added successfully", {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: "success",
                  });
                } catch (error) {
                  toast("Failed ", {
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
              {(formik) => (
                <Form>
                  {/* <label>Comment</label> 
                  <FormikTextArea
                    name="comment"
                    label="Comment"
                    className="w-full h-[296px] border-[1px] border-[#B3B3B3] rounded-[5px] outline-0 p-2 mb-2"
                  />
                  <Button
                    type="submit"
                    isLoading={formik.isSubmitting}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Add comment
                  </Button>
                </Form>
              )}
            </Formik> */
}
