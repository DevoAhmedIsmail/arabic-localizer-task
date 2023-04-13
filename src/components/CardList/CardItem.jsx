import React, { useState,useRef ,useEffect } from "react";
import "./card.css";
import { HiPencil } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbExclamationMark } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import AttendLabel from "./AttendLabel";

const CardItem = ({ data }) => {
    const [showDetails, setShowDetails] = useState(false)

    const wrapperRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowDetails(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [wrapperRef]);
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
              <p className="text-[20px] text-[#5c6974] font-[Lato] ">
                {data.name}
              </p>
              <p className="text-[13px] text-[#313030] font-[Roboto]">
                {data.title}
              </p>
              <p className="text-[10px] text-[#5c6974] font-[Roboto]">
                {data.details}
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <AttendLabel text={data.attendance} />

              <div className="flex items-center gap-2">
                <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center text-sm ">
                  <HiEnvelope className="mx-auto translate-y-[3px]" />
                </div>
                <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center text-sm ">
                  <MdCallEnd className="mx-auto translate-y-[3px]" />
                </div>
                <div className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center text-sm details-shadow cursor-pointer relative" onClick={()=> setShowDetails(!showDetails)}>
                  <TbExclamationMark className="mx-auto translate-y-[3px]" />
                  {
                    showDetails && (
                        <div className="bg-white shadow absolute top-7 -right-10 w-[240px] point-shape border border-[#eaeef0] z-10" ref={wrapperRef}>
                           <div className="grid grid-cols-3 text-left p-1">
                                <div className="flex flex-col">
                                    <p className="text-[#8997a4] text-[8px] font-[Roboto] ">Office</p>
                                    <p className="text-[#313030] text-[8px] font-[Roboto] -mt-[5px]">{data.office}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#8997a4] text-[8px] font-[Roboto] ">Role</p>
                                    <p className="text-[#313030] text-[8px] font-[Roboto] -mt-[5px]">{data.role}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#8997a4] text-[8px] font-[Roboto] ">Copied Manager</p>
                                    <p className="text-[#313030] text-[8px] font-[Roboto] -mt-[5px]">{data.copiedManager}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#8997a4] text-[8px] font-[Roboto] ">Joining Date</p>
                                    <p className="text-[#313030] text-[8px] font-[Roboto] -mt-[5px]">{data.joinDate}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#8997a4] text-[8px] font-[Roboto] ">Manager</p>
                                    <p className="text-[#313030] text-[8px] font-[Roboto] -mt-[5px]">{data.manager}</p>
                                </div>

                           </div>
                        </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
