import React, { useState, useRef, useEffect, useContext } from "react";
import "./card.css";
import { HiPencil } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbExclamationMark } from "react-icons/tb";
import { MdCallEnd } from "react-icons/md";
import AttendLabel from "./AttendLabel";
import { EmployeeContext } from "../../context/EmployeeProvider";

const CardItem = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showName, setShowName] = useState(false)
  const { deleteEmployee } = useContext(EmployeeContext);

  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  function isEllipsisActive(e) {
    if(e.target.offsetWidth < e.target.scrollWidth){
      setShowName(true)
    }else{
      setShowName(false)
    }
}
  return (
    <div className="card-item bg-white pl-4 pr-3 py-3">
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 md:col-end-4">
          <div>
            <img
              src={data.image ? data.image : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"}
              alt="person"
              className="w-[100px] h-[100px] md:w-[64px] md:h-[64px] rounded-full object-cover mx-auto"
            />
            <div className="flex justify-center gap-10 md:gap-0 md:justify-between items-center text-[#8997a4] text-[14px] mt-[15px] md:mt-[14px] mb-5 md:mb-0">
              <HiPencil className="" />
              <AiOutlinePauseCircle className="" />
              <RiDeleteBin2Fill
                className="hover:text-red-400 cursor-pointer"
                onClick={() => deleteEmployee(data.id)}
              />
            </div>
          </div>
        </div>
        <div className="col-start-1 md:col-start-4 col-end-13 pl-0 md:pl-[20px] h-full ">
          <div className="border-t md:border-t-0 border-l-0 md:border-l border-[#8997a440] h-full pl-0 md:pl-5">
            <div className="text-center md:text-left relative">
              <p className="text-[20px] text-[#5c6974] font-[Lato] capitalize text-overflow leading-[1] mb-[5px]" onMouseEnter={(e)=>isEllipsisActive(e)} onMouseLeave={()=>setShowName(false)}>
                {data.name}
              </p>
              {showName && data.name.length > 13 && (
                    <div
                      className="bg-white shadow absolute top-7 -right-10 w-[240px] point-shape border border-[#eaeef0] z-10 px-1 text-sm"
                      ref={wrapperRef}
                    >
                        {data.name}
                    </div>
                  )}
              <p className="text-[13px] text-[#313030] font-[Roboto]">
                {data.position}
              </p>
              <p className="text-[10px] text-[#5c6974] font-[Roboto] mb-[11px]">
                {data.department}
              </p>
            </div>
            <div className="flex justify-between items-center mt-[13px]">
              <AttendLabel text={data.attendance} />

              <div className="flex items-center gap-2">
                <div
                  className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center flex justify-center items-center hover:shadow relative "
                  onMouseEnter={()=>setShowEmail(true)}
                  onMouseLeave={()=>setShowEmail(false)}
                >
                  <HiEnvelope className="mx-auto text-[10px]" />
                  {showEmail && (
                    <div
                      className="bg-white shadow absolute top-7 -right-10 w-[240px] point-shape border border-[#eaeef0] z-10"
                      ref={wrapperRef}
                    >
                      <div className="grid grid-cols-3 text-left p-1">
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Email
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center flex justify-center items-center hover:shadow relative"
                  onMouseEnter={()=>setShowPhone(true)}
                  onMouseLeave={()=>setShowPhone(false)}
                  >
                  <MdCallEnd className="mx-auto text-[10px]" />
                  {showPhone && (
                    <div
                      className="bg-white shadow absolute top-7 -right-10 w-[240px] point-shape border border-[#eaeef0] z-10"
                      ref={wrapperRef}
                    >
                      <div className="grid grid-cols-3 text-left p-1">
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Phone
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center ${showDetails && 'details-shadow'}  hover:shadow cursor-pointer relative flex justify-center items-center`}
                  onMouseEnter={()=>setShowDetails(true)}
                  onMouseLeave={()=>setShowDetails(false)}

                  // onClick={() => setShowDetails(!showDetails)}
                >
                  <TbExclamationMark className="mx-auto text-[10px]" />
                  {showDetails && (
                    <div
                      className="bg-white shadow absolute top-7 -right-10 w-[240px] point-shape border border-[#eaeef0] z-10"
                      ref={wrapperRef}
                    >
                      <div className="grid grid-cols-3 text-left p-1">
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Office
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.office}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Role
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.role}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2  ">
                            Copied Manager
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px] text-overflow" title={data.manager}>
                            {data.manager}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Joining Date
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.startDate}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Manager
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px] text-overflow" title={data.manager}>
                            {data.manager}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
