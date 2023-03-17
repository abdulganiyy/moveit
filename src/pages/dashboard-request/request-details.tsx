import React, { FC } from "react";
import DashboardLayout from "@/components/layouts.tsx/DashboardLayout";
import DashboardLayoutWrapper from "@/components/layouts.tsx/DashboardLayoutWrapper";

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

const RequestDetails = () => {
  return (
    <DashboardLayoutWrapper>
      <DashboardLayout>
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
                <Detail title="Requester ID" value="78387-20/23" />
                <Detail title="Requester" value="Idris Ali" />
                <Detail title="Sample" value="Typhoid" />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="Zone" value="Alimosho" />
                <Detail title="No of Sample" value="1" />
                <Detail title="No Of Boxes" value="1" />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="State" value="Lagos" />
                <Detail title="Pickup Location" value="Usman Hospital" />
                <Detail title="Destination" value="Abuja" />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="Size" value="0.28Kg" />
                <Detail title="Date" value="20 Feb, 2023, 11:12:45 AM" />
                <Detail title="Contact Person" value="Musa Adamu" />
              </div>
              <div className="grid grid-cols-3">
                <Detail title="Contact Phone" value="+234 80 184 128 19" />
                <div className="relative">
                  <div className="absolute top-0 left-0 w-[800px] font-medium text-[14px] leading-[17px]">
                    Is/are the sample(s) properly packaged using NCDC approved
                    transport box(es)? ( * ) Y . ( .) N{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white py-[31px] px-[74px] rounded-[5px]">
            <label>Comment</label>
            <textarea className="w-full h-[296px] border-[1px] border-[#B3B3B3] rounded-[5px] outline-0 p-2"></textarea>
          </div>
        </div>
      </DashboardLayout>
    </DashboardLayoutWrapper>
  );
};

export default RequestDetails;
