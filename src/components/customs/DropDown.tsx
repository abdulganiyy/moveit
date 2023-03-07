import React, { useState, FC, ReactNode } from "react";

interface DropDownProps {
  icon?: ReactNode;
  children?: ReactNode;
  items?: string[];
  value?: any;
  setValue?: any;
}

const DropDown: FC<DropDownProps> = ({
  icon,
  children,
  items,
  value,
  setValue,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <span
      onClick={() => setShow(!show)}
      className="inline-block rounded-lg p-2 relative bg-[#EBE7F2] cursor-pointer z-20"
    >
      {icon ? icon : children}
      <div
        className={`bg-[#EBE7F2] rounded-md p-2 ${
          show ? "inline-flex flex-col gap-y-2" : "hidden"
        } absolute top-full -left-full z-50`}
      >
        {items?.map((item, i) => (
          <span
            key={i}
            className={`cursor-pointer ${value === item && "text-red-300"}`}
            onClick={() => {
              setValue(item === "all" ? "all" : item);
              setShow(!show);
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </span>
  );
};

export default DropDown;
