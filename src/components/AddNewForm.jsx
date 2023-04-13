import React, { useContext, useEffect, useRef, useState } from "react";
import ModalTitle from "./ModalTitle";
import Button from "./Button";
import { EmployeeContext } from "../context/EmployeeProvider";
import { SelectInput } from "./Inputs";
import ErrorSpan from "./ErrorSpan";

const AddNewForm = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [attendance, setAttendance] = useState("");
  const [office, setOffice] = useState("");
  const [role, setRole] = useState("");
  const [copiedManager, setCopiedManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [manager, setManager] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setimage] = useState("");
  const [errors, setErrors] = useState({});

  // to store image which come form user
  const [selectedImage, setSelectedImage] = useState(null);

  const { addEmployee } = useContext(EmployeeContext);

  // Validations
  function validateForm() {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/) {
      errors.phone = "Phone is invalid";
    }
    if (!position) {
      errors.position = "Position is required";
    }
    if (!department) {
      errors.department = "Department is required";
    }
    if (!attendance) {
      errors.attendance = "Attendance is required";
    }
    if (!office) {
      errors.office = "Office is required";
    }
    if (!role) {
      errors.role = "Role is required";
    }
    if (!startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!manager) {
      errors.manager = "Manager is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Handle Image come from user
  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    setimage(URL.createObjectURL(imageFile));
  };

  // Submit Form
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      // console.log('Form submitted:', { name, email, phone });
      // Do something with the form data
      addEmployee({
        name,
        position,
        role,
        department,
        attendance,
        office,
        startDate,
        manager,
        image,
      });

      closeModal();
    }
  }

  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen z-30 flex justify-center items-center"
      style={{ backgroundColor: "rgba(40, 104, 174, 0.43)" }}
    >
      <div
        className="bg-white p-5 max-h-[100vh] md:min-h-[700px] w-[90%] md:w-[700px] lg:w-[1000px] overflow-auto"
        ref={wrapperRef}
      >
        <div className="border-b-2 border-[#23aaeb]  pb-3">
          <p className="text-[#23aaeb] font-[Roboto] text-[18px]">
            NEW EMPLOYEE
          </p>
        </div>

        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalTitle text="Personal Info" />
            <div className="grid grid-cols-12 items-center">
              <div className="col-start-1 col-end-13 md:col-end-4 relative">
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />

                <label htmlFor="image-upload">
                  <div className={`box box-drag border-2 border-dotted }`}>
                    <span className={`w-full h-full text-[13px] font-bold text-center text-[#5c6974] font-[Roboto] tracking-[1.73px] ${!image && 'absolute top-[43%] translate-y-0'}`}>
                      {image ? <img src={image} alt="user" className="w-full h-full object-contain" /> : "DRAG IMAGE HERE"}
                    </span>
                  </div>
                </label>
              </div>
              {/* Inputs */}
              <div className="col-start-1 md:col-start-4 col-end-13">
                <div className="flex justify-between items-center flex-wrap">
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label className="text-[#313030] text-[13px]">Name</label>
                    <input
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <ErrorSpan text={errors.name} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label className="text-[#313030] text-[13px]">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    {errors.startDate && <ErrorSpan text={errors.startDate} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label className="text-[#313030] text-[13px]">Phone</label>
                    <input
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <ErrorSpan text={errors.phone} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label className="text-[#313030] text-[13px]">Email</label>
                    <input
                      placeholder="Email"
                      className="border border-[#aaaaaad6] focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <ErrorSpan text={errors.email} />}
                  </div>
                </div>
              </div>
              {/* End Inputs */}
            </div>

            <ModalTitle text="Office Info" />

            {/* Inputs */}
            <div className="flex justify-between items-center flex-wrap">
              <div className="w-full flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]">Office</label>
                <SelectInput
                  id="office"
                  changeHandler={setOffice}
                  options={["Arabic Localizer", "Microsoft", "IBM"]}
                />
                {errors.office && <ErrorSpan text={errors.office} />}
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]">Department</label>
                <SelectInput
                  id="department"
                  changeHandler={setDepartment}
                  options={[
                    "Business Development",
                    "Chemistry Department",
                    "Agriculture Department",
                  ]}
                />
                {errors.department && <ErrorSpan text={errors.department} />}
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]" htmlFor="att">
                  Attendance Profile
                </label>
                <SelectInput
                  id="att"
                  changeHandler={setAttendance}
                  options={["Weekend", "Present", "Absent"]}
                />
                {errors.attendance && <ErrorSpan text={errors.attendance} />}
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]">Role</label>
                <SelectInput
                  id="role"
                  changeHandler={setRole}
                  options={["Manager", "Employee", "Customer"]}
                />
                {errors.role && <ErrorSpan text={errors.role} />}
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]">Position</label>
                <SelectInput
                  id="Position"
                  changeHandler={setPosition}
                  options={["HR Head", "Manager", "Worker"]}
                />
                {errors.position && <ErrorSpan text={errors.position} />}
              </div>

              <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                <label className="text-[#313030] text-[13px]">
                  Direct Manager
                </label>
                <SelectInput
                  id="dm"
                  changeHandler={setManager}
                  options={["Ahmed Ismail", "Malek Mohammed"]}
                />
                {errors.manager && <ErrorSpan text={errors.manager} />}
              </div>
            </div>
            {/* End Inputs */}

            <ModalTitle text="Office Info" />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="allow" />
              <label
                className="text-[13px] font-bold text-[#313030]"
                htmlFor="allow"
              >
                Allow Employee To Work From Home
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className={` text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] bg-[#ff6a6a] `}
                onClick={closeModal}
              >
                Cancel
              </button>
              <Button text="Save" color="#23aaeb" onSubmit={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForm;
