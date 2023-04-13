import React, { useEffect, useRef, useState } from "react";
import ModalTitle from "./ModalTitle";
import Button from "./Button";

const AddNewForm = ({closeModal}) => {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragEnter(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    console.log("File dropped:", file);
  }

  const wrapperRef = useRef(null);
  useEffect(() => {
      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            closeModal()
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapperRef]);

  return (
    <div
      className="absolute top-0 left-0 w-full min-h-screen z-30 flex justify-center items-center"
      style={{ backgroundColor: "rgba(40, 104, 174, 0.43)" }}
    >
      <div className="bg-white p-5  w-[90%] md:w-[700px] lg:w-[1000px] overflow-auto" ref={wrapperRef}>
        <div className="border-b-2 border-[#23aaeb]  pb-3">
          <p className="text-[#23aaeb] font-[Roboto] text-[18px]">
            NEW EMPLOYEE
          </p>
        </div>

        <div className="">
          <form>
            <ModalTitle text="Personal Info" />
            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Drop Box */}
              <div
                className="col-start-1 col-end-13 md:col-end-4"
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div
                  className={`box box-drag border-2 ${
                    isDragging ? "border-solid" : "border-dotted"
                  }`}
                >
                  <span className="text-[13px] font-bold text-center text-[#5c6974] font-[Roboto] tracking-[1.73px]">
                    {isDragging ? "Drop The image" : "DRAG IMAGE HERE"}
                  </span>
                </div>
              </div>
              {/*End Drop Box */}
              {/* Inputs */}
              <div className="col-start-1 md:col-start-4 col-end-13">
                <div className="flex justify-between items-center flex-wrap">
                  <div className="w-1/2 flex flex-col px-4 mb-2">
                    <label className="text-[#313030] text-[13px]">Name</label>
                    <input className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded" />
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-2">
                    <label className="text-[#313030] text-[13px]">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-2">
                    <label className="text-[#313030] text-[13px]">Phone</label>
                    <input className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded" />
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-2">
                    <label className="text-[#313030] text-[13px]">Email</label>
                    <input
                      placeholder="Email"
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                    />
                  </div>
                </div>
              </div>
              {/* End Inputs */}
            </div>

            <ModalTitle text="Office Info" />

            {/* Inputs */}
            <div className="flex justify-between items-center flex-wrap">
              <div className="w-full flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">Office</label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    name
                  </option>
                  <option className="text-[#404447]">Arabic Localizer</option>
                  <option className="text-[#404447]">Microsoft</option>
                  <option className="text-[#404447]">IBM</option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">Department</label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option className="text-[#404447]">
                    Business Development
                  </option>
                  <option className="text-[#404447]">
                    Chemistry Department
                  </option>
                  <option className="text-[#404447]">
                    Agriculture Department
                  </option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">
                  Attendance Profile
                </label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option className="text-[#404447]">Weekend</option>
                  <option className="text-[#404447]">Present</option>
                  <option className="text-[#404447]">Absent</option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">Role</label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option className="text-[#404447]">Manager</option>
                  <option className="text-[#404447]">Employee</option>
                  <option className="text-[#404447]">Customer</option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">Position</label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option className="text-[#404447]">HR Head</option>
                  <option className="text-[#404447]">Manager</option>
                  <option className="text-[#404447]">Worker</option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-2">
                <label className="text-[#313030] text-[13px]">
                  Direct Manager
                </label>
                <select
                  name=""
                  id=""
                  className="px-3 border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] rounded text-[13px] text-[#8f9da9]"
                >
                  <option disabled selected>
                    Select Option
                  </option>
                  <option className="text-[#404447]">Ahmed Ismail</option>
                  <option className="text-[#404447]">Malek Mohammed</option>
                </select>
              </div>
            </div>
            {/* End Inputs */}

            <ModalTitle text="Office Info" />

            <div className="flex items-center gap-2">
                <input type="checkbox" id="allow" />
                <label className="text-[13px] font-bold text-[#313030]" htmlFor="allow">Allow Employee To Work From Home</label>
            </div>
            
            <div className="flex justify-end gap-3">
                <Button text="Cancel" color="#ff6a6a" />
                <Button text="Save" color="#23aaeb"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForm;
