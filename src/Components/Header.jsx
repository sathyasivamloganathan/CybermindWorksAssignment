import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const Header = ({ OnDisable }) => {
  const handleClick = () => {
    OnDisable();
  };
  return (
    <div className="flex flex-row justify-between mb-[20px]">
      <div>
        <IoMdCheckmarkCircleOutline
          onClick={handleClick}
          className="text-red-500 text-[20px] cursor-pointer"
        />
      </div>
      <div className="flex flex-row gap-[15px] text-[20px] text-red-500">
        <MdDeleteOutline />
        <IoCloseCircleOutline />
      </div>
    </div>
  );
};

export default Header;
