import React from "react";
import "./card.css";
import { HiPencil } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbExclamationMark } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import AttendLabel from "./AttendLabel";

const CardItem = ({ data }) => {
  return (
    <div className="card-item bg-white px-5 py-3">
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-4">
          <div>
            <img
              src={data.image}
              alt="person"
              className="w-[64px] h-[64px] rounded-full object-cover"
            />
            <div className="flex justify-between items-center text-[#8997a4] text-[18px] mt-[10px]">
              <HiPencil />
              <AiOutlinePauseCircle />
              <RiDeleteBin2Fill />
            </div>
          </div>
        </div>
        <div className="col-start-4 col-end-13 pl-[20px] h-full ">
            <div className="border-l border-[#8997a440] h-full pl-5">
                <div>
                    <p className="text-[20px] text-[#5c6974] font-[Lato] ">{data.name}</p>
                    <p className="text-[13px] text-[#313030] font-[Roboto]">{data.title}</p>
                    <p className="text-[10px] text-[#5c6974] font-[Roboto]">{data.details}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <AttendLabel text={data.attendance} />

                    <div className="flex items-center gap-1">
                        <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center mx-auto "><HiEnvelope /></div>
                        <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center mx-auto "><MdCallEnd /></div>
                        <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center mx-auto "><TbExclamationMark /></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
