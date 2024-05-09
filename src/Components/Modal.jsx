import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegUser } from "react-icons/fa";
import UserImage from '../assets/userImage.png'
import { CiStickyNote } from "react-icons/ci";
import Comments from "./Comments";
import Header from "./Header";

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    dateTime: new Date(),
  });
  const [editable, setEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDisabled, setIsDiabled] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTickClick = () => {
    setEditable(!editable);
  };

  const handleDateTimeChange = (date) => {
    setFormData({
      ...formData,
      dateTime: date,
    });
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setEditable(false);
  };

  const users = [
    { id: 1, name: "Sathya Sivam", imageUrl: UserImage},
    { id: 2, name: "Loganathan", imageUrl: UserImage },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleDisable = () => {
    console.log(isDisabled)
    setIsDiabled(true);
  }

  return (
    <div
      className={`relative
        ${
          isDisabled
            ? "lg:w-[350px] w-[80%] lg:h-[534px] h-[534px] m-auto mt-[100px] mb-[100px] rounded-[20px] p-[25px] border-2 border-[#973737] opacity-50 pointer-events-none"
            : "lg:w-[350px] w-[80%] lg:h-[534px] h-[534px] m-auto mt-[100px] mb-[100px] rounded-[20px] p-[25px] border-2 border-[#BCBCBC]"
        }
      }`}
    >
      <Header onDisable={handleDisable} />
      <div className="flex flex-row justify-center">
        <form onSubmit={handleSubmit}>
          {editable ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[269px] h-[44px] rounded-[50px] gap-[10px] mr-[10px] p-[20px] border-2 border-[#CECECE] text-center font-bold text-[18px] text-red-500"
            />
          ) : (
            <span>
              <input
                type="text"
                name="name"
                disabled
                value={formData.name}
                className="w-[269px] h-[44px] rounded-[50px] gap-[10px] mr-[10px] p-[20px] border-2 border-[#CECECE] text-center font-bold text-[18px] text-red-500"
              />
            </span>
          )}
          {editable ? (
            <button
              type="submit"
              className="mr-[10px] ml-[90%] mt-[-20px] text-center font-bold text-[18px] text-red-500"
            >
              <IoIosSave />
            </button>
          ) : (
            ""
          )}

          {editable ? (
            <DatePicker
              selected={formData.dateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMM d, yyyy h:mm aa"
              className="w-[269px] h-[44px] rounded-[50px] gap-[10px] mr-[10px] p-[20px] border-2 border-[#CECECE] font-semibold text-[16px] text-center"
            />
          ) : (
            <div className="w-[269px] h-[44px] rounded-[50px] gap-[10px] mr-[10px] mt-[10px] p-[10px] text-center border-2 border-[#CECECE] font-semibold text-[16px]">
              {formatDate(formData.dateTime)}
            </div>
          )}
        </form>
        <button onClick={handleTickClick}>{editable ? "" : <CiEdit />}</button>
      </div>

      <div className="flex flex-row mt-[30px]">
        <div className="flex items-center">
          <FaRegUser className="mr-5 text-red-500" />
          <p className="italic">Assign to:</p>
        </div>

        <div className="relative inline-block text-left ml-[40px]">
          <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-[25px] border border-[#EDEDED] bg-white px-4 py-2 text-[16px] font-semibold text-[#009379] shadow-sm focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {selectedUser ? (
              <>
                <img
                  src={selectedUser.imageUrl}
                  alt={selectedUser.name}
                  className="h-8 w-8 rounded-full mr-2"
                />
                {selectedUser.name}
              </>
            ) : (
              <>
                <FaRegUser className="mr-2" />
                Select User
              </>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-[25px] shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => handleUserSelect(user)}
                  >
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span className="text-[#009379]">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row mt-[20px]">
        <div className="flex items-center">
          <CiStickyNote className="mr-5 text-red-500" />
          <p className="italic">Note:</p>
        </div>
        <div className="w-[190px] h-[44px] rounded-[12px] gap-[10px] mr-[10px] ml-[20px] mt-[10px] pl-[10px] p-[0px] text-start border-2 text-[#5A5A5A] border-[#CECECE] font-semibold text-[14px]">
          <p>09382049832</p>
          <p>www.flowervendor.com</p>
        </div>
      </div>

      <div className="border-[1px] border-[#E3E3E3] w-[269px] mt-[25px] mb-[25px] m-auto"></div>

      <div>
        <p className="italic font-bold text-[14px] text-[#5A5A5A]">Comments:</p>
        <Comments />
      </div>
    </div>
  );
}

export default FormComponent;
