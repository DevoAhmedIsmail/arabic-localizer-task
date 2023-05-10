import React, { useContext, useEffect, useRef, useState } from "react";
import ModalTitle from "./ModalTitle";
import Button from "./Button";
import { EmployeeContext } from "../context/EmployeeProvider";
import { SelectInput } from "./Inputs";
import ErrorSpan from "./ErrorSpan";
import { MdClose } from "react-icons/md";
import { GET_ALL_OPTIONS } from "../graphql";
import { useQuery } from "@apollo/client";

const AddNewForm = ({ closeModal, userDataToEdit }) => {
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    starts_at: "",
    phone: "",
    email: "",
    attendance_profile: "",
    department: "",
    manager: "",
    office: "",
    position: "",
    role: "",
    can_work_home: false,
  });

  const [optionsDATA, setOptionsDATA] = useState({
    departments: [],
    positions: [],
    offices: [],
    attendance_profiles: [],
    employeesName: [],
    roles: []
  });

  const [isSaveForm, setIsSaveForm] = useState(false);
  const [errors, setErrors] = useState({});

  // to store image which come form user
  const [selectedImage, setSelectedImage] = useState(null);

  // Add Employee to context
  const { addEmployee } = useContext(EmployeeContext);

  // Validations
  function validateForm() {
    let errors = {};
    if (!userData.name) {
      errors.name = "Name is required";
    }
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email is invalid";
    }
    if (!userData.phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/) {
      errors.phone = "Phone is invalid";
    }
    if (!userData.position) {
      errors.position = "Position is required";
    }
    if (!userData.department) {
      errors.department = "Department is required";
    }
    if (!userData.attendance_profile) {
      errors.attendance = "Attendance is required";
    }
    if (!userData.office) {
      errors.office = "Office is required";
    }
    if (!userData.role) {
      errors.role = "Role is required";
    }
    if (!userData.starts_at) {
      errors.startDate = "Start Date is required";
    }
    if (!userData.manager) {
      errors.manager = "Manager is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Handle Image come from user
  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      setUserData((prev) => ({
        ...prev,
        image: URL.createObjectURL(imageFile),
      }));
    }
  };

  // Submit Form
  function handleSubmit(e) {
    setIsSaveForm(true);
    e.preventDefault();
    if (validateForm()) {
      // console.log('Form submitted:', { name, email, phone });
      // Do something with the form data

      // addEmployee(userData);
      

      closeModal();
      // setIsSaveForm(false);
    }
  }

  const wrapperRef = useRef(null);
  useEffect(() => {
    
    if(userDataToEdit.id !== undefined) {
      setUserData({
        name: userDataToEdit.name,
        image: userDataToEdit.img_path,
        starts_at: userDataToEdit.starts_at,
        phone: userDataToEdit.phone,
        email: userDataToEdit.email,
        attendance_profile: userDataToEdit.attendance_profile?.name,
        department: userDataToEdit.department?.name,
        manager: userDataToEdit.manager?.name,
        office: userDataToEdit.office?.name,
        position: userDataToEdit.position?.name,
        can_work_home: userDataToEdit.can_work_home,
      })
    }else {
      setUserData({

        name: "",
      image: "",
      starts_at: "",
      phone: "",
      email: "",
      attendance_profile: "",
      department: "",
      manager: "",
      office: "",
      position: "",
      role: "",
      can_work_home: false,
      })
    }
    
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef,userDataToEdit]);

  // Cancel Image
  const cancelImage = (e) => {
    e.stopPropagation();
    setUserData((prev) => ({ ...prev, image: "" }));
  };

  // Fetch from graphql
  const { loading, error, data, refetch } = useQuery(GET_ALL_OPTIONS, {
    variables: { first: 100 },
    // fetchPolicy: "cache-first"
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      // let depArr = data.company_departments.data.map((opt)=> opt.name)
      setOptionsDATA({
        departments: data.company_departments.data.map((opt) => opt.name),
        offices: data.offices.data.map((opt) => opt.name),
        attendance_profiles: data.attendance_profiles.data.map(
          (opt) => opt.name
          ),
          positions: data.positions.data.map((opt) => opt.name),
          employeesName: data.company_users.data.map((opt) => opt.name),
          roles: data.profile.company.currentSubscription.plan.roles.map((role)=> role.name)
        });
        // console.log(optionsDATA);
    }

    if (isSaveForm) {
      validateForm();
    }
  }, [userData, data]);

  const handleInputChange = (e) => {
    const { target } = e;
    setUserData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen z-30 flex justify-center items-center"
      style={{ backgroundColor: "rgba(40, 104, 174, 0.43)" }}
    >
      <div
        className="bg-white pt-[11px] pb-[0px] p-5 max-h-[100vh] min-h-[710px] md:min-h-[717px] w-[90%] md:w-[700px] lg:w-[1000px] overflow-auto rounded-[4px]"
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
            <div className="grid grid-cols-12 mt-[20px]">
              <div className="col-start-1 col-end-13 md:col-end-4 relative mb-4">
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                {/* close image */}
                {userData.image && (
                  <div className="absolute top-2 right-2 font-bold text-red-400 cursor-pointer z-[100] w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <MdClose onClick={(e) => cancelImage(e)} />
                  </div>
                )}

                <label htmlFor="image-upload" className="h-[111px] block">
                  <div
                    className={`box box-drag border-2 border-dashed relative }`}
                  >
                    <span
                      className={`text-[13px] font-normal text-center text-[#5c6974] font-[Roboto] tracking-[1.73px] h-full ${
                        !userData.image && "absolute top-[43%] translate-y-0"
                      }`}
                    >
                      {userData.image ? (
                        <img
                          src={userData.image}
                          alt="user"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        "DRAG IMAGE HERE"
                      )}
                    </span>
                  </div>
                </label>
              </div>
              {/* Inputs */}
              <div className="col-start-1 md:col-start-4 col-end-13">
                <div className="flex justify-between items-center flex-wrap mt-[-4px]">
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label
                      className={`text-[13px] ${
                        errors.name ? "text-red-400" : "text-[#313030]"
                      }`}
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className={`border ${
                        errors.name ? "border-red-400" : "border-[#aaaaaad6]"
                      }  focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded`}
                      value={userData.name}
                      name="name"
                      onChange={handleInputChange}
                    />
                    {errors.name && <ErrorSpan text={errors.name} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label
                      htmlFor="starts_at"
                      className={`text-[13px] ${
                        errors.startDate ? "text-red-400" : "text-[#313030]"
                      }`}
                    >
                      Start Date
                    </label>
                    <input
                      id="starts_at"
                      name="starts_at"
                      type="date"
                      className={`border ${
                        errors.startDate
                          ? "border-red-400"
                          : "border-[#aaaaaad6]"
                      }  focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded`}
                      value={userData.starts_at}
                      onChange={handleInputChange}
                    />
                    {errors.startDate && <ErrorSpan text={errors.startDate} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label
                      htmlFor="phone"
                      className={`text-[13px] ${
                        errors.phone ? "text-red-400" : "text-[#313030]"
                      }`}
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className={`border ${
                        errors.phone ? "border-red-400" : "border-[#aaaaaad6]"
                      }  focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded`}
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <ErrorSpan text={errors.phone} />}
                  </div>
                  <div className="w-1/2 flex flex-col px-4 mb-4 relative">
                    <label
                      htmlFor="email"
                      className={`text-[13px] ${
                        errors.email ? "text-red-400" : "text-[#313030]"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      placeholder="Email"
                      className={`border ${
                        errors.email ? "border-red-400" : "border-[#aaaaaad6]"
                      }  focus:outline-[#aaaaaad6] h-[30px] px-3 text-[13px] rounded`}
                      value={userData.email}
                      onChange={handleInputChange}
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
              <div className="w-full flex flex-col  mb-4 relative">
                <label
                  className={`text-[13px] ${
                    errors.office ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="office"
                >
                  Office
                </label>
                <SelectInput
                  id="office"
                  changeHandler={setUserData}
                  options={optionsDATA.offices}
                  isError={errors.office}
                  value={userData.office}
                  isLoading={loading}
                />
                {errors.office && <ErrorSpan text={errors.office} />}
              </div>

              <div className="w-1/2 flex flex-col  mb-4 relative">
                <label
                  htmlFor="department"
                  className={`text-[13px] ${
                    errors.department ? "text-red-400" : "text-[#313030]"
                  }`}
                >
                  Department
                </label>
                <SelectInput
                  id="department"
                  isLoading={loading}
                  changeHandler={setUserData}
                  options={optionsDATA.departments}
                  isError={errors.department}
                  value={userData.department}
                />
                {errors.department && <ErrorSpan text={errors.department} />}
              </div>

              <div className="w-1/2 flex flex-col pl-[32px] mb-4 relative">
                <label
                  className={`text-[13px] ${
                    errors.attendance ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="attendance_type"
                >
                  Attendance Profile
                </label>
                <SelectInput
                  id="attendance_type"
                  isLoading={loading}
                  changeHandler={setUserData}
                  options={optionsDATA.attendance_profiles}
                  isError={errors.attendance}
                  value={userData.attendance_profile}
                />
                {errors.attendance && <ErrorSpan text={errors.attendance} />}
              </div>

              <div className="w-1/2 flex flex-col  mb-4 relative">
                <label
                  className={`text-[13px] ${
                    errors.role ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="role"
                >
                  Role
                </label>
                <SelectInput
                  id="role"
                  isLoading={loading}
                  changeHandler={setUserData}
                  options={optionsDATA.roles}
                  isError={errors.role}
                  value={userData.role}
                />
                {errors.role && <ErrorSpan text={errors.role} />}
              </div>

              <div className="w-1/2 flex flex-col pl-[32px] mb-4 relative">
                <label
                  className={`text-[13px] ${
                    errors.position ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="position"
                >
                  Position
                </label>
                <SelectInput
                  id="position"
                  isLoading={loading}
                  changeHandler={setUserData}
                  options={optionsDATA.positions}
                  isError={errors.position}
                  value={userData.position}
                />
                {errors.position && <ErrorSpan text={errors.position} />}
              </div>

              <div className="w-1/2 flex flex-col relative">
                <label
                  className={`text-[13px] ${
                    errors.manager ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="manager"
                >
                  Direct Manager
                </label>
                <SelectInput
                  id="manager"
                  isLoading={loading}
                  changeHandler={setUserData}
                  options={optionsDATA.employeesName}
                  isError={errors.manager}
                  value={userData.manager}
                />
                {errors.manager && <ErrorSpan text={errors.manager} />}
              </div>
            </div>
            {/* End Inputs */}

            <ModalTitle text="Work From Home" />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allow"
                checked={userData.can_work_home}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    can_work_home: !prev.can_work_home,
                  }))
                }
              />
              <label
                className={`text-[13px] ${
                  userData.can_work_home && "font-bold"
                } text-[#313030]`}
                htmlFor="allow"
              >
                Allow Employee To Work From Home
              </label>
            </div>

            <div className="bg-[#d2d2d2] block w-full h-[0.5px] mt-5 mb-2"></div>

            <div className="flex justify-end gap-3 mt-[15px]">
              <button
                className={` text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] bg-[#ff6a6a] text-[13px] `}
                onClick={closeModal}
              >
                Cancel
              </button>
              <Button
                text={`${userDataToEdit.id == undefined ? "Save" : "Update"}`}
                color="#23aaeb"
                fontSize="13px"
                onSubmit={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForm;
