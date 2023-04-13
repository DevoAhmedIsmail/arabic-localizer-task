import React, { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import Badge from "./Badge";
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return (
    <nav className="bg-white py-3">
      <div className="container mx-auto px-6">
        <div className="flex justify-end items-center gap-5 ">
          <p className="hidden md:block font-[Roboto] text-[#474747] text-[15px]">
            {currentTime.toLocaleString("en-US", options)}
          </p>

          <button className="hidden md:block  bg-[color:var(--green-color)] text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] ">
            Sign In
          </button>

          <div className="hidden md:block  relative border-x-2 border-[#e8e4e4] py-3 px-5">
            <MdNotificationsActive className="text-[#8997a4] text-[23px]" />
            <Badge
              text="1"
              top="9px"
              right="16px"
              color="var(--green-color)"
            />
          </div>

          <div className="flex items-center cursor-pointer gap-2">
            <div className="">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="person"
                className="w-[32px] h-[32px] rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-[#8997a4] hover:text[#6e7882]">
              <p className=" font-[Roboto] text-[20px]">
                Ahmed Khaled
              </p>
              <IoIosArrowDown className="" />
            </div>
          </div>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
