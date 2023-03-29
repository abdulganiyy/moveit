import React, { FC } from "react";

interface ConfirmBoxProps {
  title?: string;
  open?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const ConfirmBox: FC<ConfirmBoxProps> = ({
  title,
  open,
  onConfirm,
  onClose,
}) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed inset-0 w-full h-full bg-gray-700/50 z-20 flex justify-center items-center p-2`}
    >
      <div className="w-56 h-42 bg-white p-2 rounded-md relative block">
        <h4 className="text-md font-bold">Delete User</h4>
        <div className="flex flex-col justify-between">
          <div>Are you sure you want to delete this user?</div>
          <div className="flex justify-end mt-8 gap-x-2 mb-2">
            <button
              className="p-1 px-2 bg-red-500 rounded-md inline-block text-white"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="p-1 px-2 bg-green-500 rounded-md inline-block text-white"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
