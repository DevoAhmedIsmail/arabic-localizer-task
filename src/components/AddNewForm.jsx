import React, {  useEffect, useRef, useState } from "react";
import ModalTitle from "./ModalTitle";
import Button from "./Button";
import { SelectInput, SelectMultiInput } from "./Inputs";
import ErrorSpan from "./ErrorSpan";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { ADD_USER, GET_COMPANY_USERS, UPDATE_USER } from "../graphql";
import { useMutation } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";

const AddNewForm = ({
  closeModal,
  userDataToEdit,
  pageNumber,
  numOfCard,
  searchText,
  options,
  getUrlFromImagePath
}) => {
  const initState = {
    name: "",
    face: null,
    starts_at: "",
    phone: "",
    email: "",
    attendance_profile: {},
    department: {},
    manager: {},
    copied_managers: [],
    office: {},
    position: {},
    role: 0,
    can_work_home: 0,
  };

  const [userData, setUserData] = useState(initState);
  const [updateImage, setupdateImage] = useState(false);
  const [errors, setErrors] = useState({});

  // to store image which come form user
  const [selectedImage, setSelectedImage] = useState(null);

  // variable to send to server
  const variable = {
    id: userDataToEdit?.id,
    name: userData.name,
    starts_at: userData.starts_at,
    email: userData.email,
    phone: userData.phone,
    department_id: userData.department,
    manager_id: userData.manager,
    company_id: userData.office,
    office_id: userData.office,
    position_id: userData.position,
    att_profile_id: userData.attendance_profile,
    can_work_home: userData.can_work_home,
    copied_managers: userData.copied_managers.map((manag) => manag.id),
    has_credentials: 1,
    max_homeDays_per_week: 0,
    flexible_home: 0,
    can_ex_days: 0,
  };

  // Handle Image come from user
  const handleImageUpload = (event) => {
    
    const imageFile = event.target.files[0];
    if (imageFile) {
      // console.log("imageFile: ",imageFile);
      setupdateImage(true)
      setSelectedImage(imageFile);
      setUserData((prev) => ({
        ...prev,
        face: {path: URL.createObjectURL(imageFile)},
      }));
    }
  };

  // Push Values to api
  const [updateUserQL, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const [addUserQL, { loading: createUserLoading }] = useMutation(ADD_USER);

  // Validation on Error coming from server
  const validationHandler = (ERROR) => {
    let errors = {};
    const errorExtensionValidation = ERROR[0].extensions.validation;
    if (errorExtensionValidation) {
      console.log("Regular : ", ERROR);
      const extensionsValiName =
        errorExtensionValidation?.["input.user_input.name"];
      const extensionsValiEmail =
        errorExtensionValidation?.["input.user_input.email"];
      const extensionsValiForceEmail =
        errorExtensionValidation?.["input.user_input.force_email"];
      const extensionsValiPhone =
        errorExtensionValidation?.["input.user_input.phone"];
      const extensionsValiDate =
        errorExtensionValidation?.[
          "input.user_salary_config_input.salary_config.start_at"
        ];
      const extensionsValiAttProfile =
        errorExtensionValidation?.["input.user_input.force_update_att_profile"];

      errors.name = extensionsValiName ? extensionsValiName[0] : "";
      errors.email = extensionsValiEmail
        ? extensionsValiEmail[0]
        : extensionsValiForceEmail
        ? extensionsValiForceEmail[0]
        : "";
      errors.phone = extensionsValiPhone ? extensionsValiPhone[0] : "";
      errors.startDate = extensionsValiDate ? extensionsValiDate[0] : "";
      errors.attendance = extensionsValiAttProfile
        ? extensionsValiAttProfile[0]
        : "";
    } else {
      console.log("SWAL: ", ERROR);
      Swal.fire("Error!", ERROR[0].message);
    }
    setErrors(errors);
  };

  // Submit Form
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    if (true) {
      try {
        // Update method
        if (userDataToEdit.id !== undefined) {
          console.log(userData);
          await updateUserQL({
            variables: {
              ext: updateImage ? {...variable,user_image: selectedImage } : {...variable}
            },
            onError({ networkError, graphQLErrors }) {
              if (graphQLErrors) {
                validationHandler(graphQLErrors);
              }
              if (networkError) {
                console.log(" [Network error]:", networkError);
              }
            },
            onCompleted: (data) => {
              Swal.fire("User Updated!", "", "success");
              setUserData(initState);
              setupdateImage(false)
              closeModal();
            },
          });
        } else {
          // Add new User method
           await addUserQL({
            variables: {
              userInput: { ...variable, role_id: userData.role,user_image: selectedImage  },
              userSalaryInput: {
                salary_config: {
                  start_at: userData.starts_at,
                },
              },
            },
            onError({ networkError, graphQLErrors }) {
              if (graphQLErrors) {
                validationHandler(graphQLErrors);
              }
              if (networkError) {
                console.log(" [Network error]:", networkError);
              }
            },
            refetchQueries: [
              {
                query: GET_COMPANY_USERS,
                variables: {
                  first: numOfCard,
                  page: pageNumber,
                  input: searchText || "",
                },
              },
            ],
            onCompleted: (data) => {
              Swal.fire("User Added!", "", "success");
              setUserData(initState);
              closeModal();
            },
          });
        }
      } catch (error) {
        console.log(error);
        // Swal.fire("Error!", error.message, "error");
      }

      // setIsSaveForm(false);
    }
  };

  const managerOptions = () => {
    const res = options.employeesName.filter((userInfo) => {
      return !userData.copied_managers.some(
        (copied) => copied.id === userInfo.value
      );
    });
    return res;
  };

  const wrapperRef = useRef(null);
  useEffect(() => {
    if (userDataToEdit.id !== undefined) {
      const {
        name,
        face,
        starts_at,
        phone,
        email,
        attendance_profile,
        department,
        manager,
        copied_managers,
        office,
        position,
        can_work_home,
      } = userDataToEdit;

      setUserData({
        ...initState,
        name,
        face,
        starts_at,
        phone,
        email,
        attendance_profile:
          attendance_profile?.id || initState.attendance_profile,
        department: department?.id || initState.department,
        manager: manager?.id || initState.manager,
        copied_managers,
        office: office?.id || initState.office,
        position: position?.id || initState.position,
        can_work_home,
      });
    } else {
      setUserData(initState);
    }

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, userDataToEdit]);

  // Cancel Image
  const cancelImage = (e) => {
    e.stopPropagation();
    console.log('delete image');
    setUserData((prev) => ({ ...prev, face: null }));
    setSelectedImage(null)
    setupdateImage(true)
  };

  const handleInputChange = (e) => {
    const { target } = e;
    setUserData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen z-30 flex justify-center items-center"
      style={{ backgroundColor: "rgba(40, 104, 174, 0.43)" }}
    >
      {(createUserLoading || updateLoading) && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
          <LoadingSpinner />
        </div>
      )}
      {/* {updateLoading && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
          <LoadingSpinner />
        </div>
      )} */}
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
          <form onSubmit={(e) => handleSubmitUpdate(e)}>
            <ModalTitle text="Personal Info" />
            <div className="grid grid-cols-12 mt-[20px]">
              <div className="col-start-1 col-end-13 md:col-end-4 relative mb-4 overflow-hidden">
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                {/* close image */}
                {userData.face && (
                  <div className="absolute top-2 right-2 font-bold text-red-400 cursor-pointer z-[100] w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <MdClose onClick={(e) => cancelImage(e)} />
                  </div>
                )}

                <label htmlFor="image-upload" className="h-[111px] block">
                  <div
                    className={`box box-drag border-2 border-dashed relative cursor-pointer`}
                  >
                    <span
                      className={`text-[13px] font-normal text-center text-[#5c6974] font-[Roboto] tracking-[1.73px] h-full ${
                        !userData.face && "absolute top-[43%] translate-y-0"
                      }`}
                    >
                      {userData.face ? (
                        <img
                          src={getUrlFromImagePath(userData.face.path) || userData.face.path}
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
            <div className="grid grid-cols-2 gap-x-[32px]">
              <div className="w-full flex flex-col  mb-4 relative col-span-full">
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
                  options={options.offices}
                  isError={errors.office}
                  value={userData.office}
                  // isLoading={loading}
                />
                {errors.office && <ErrorSpan text={errors.office} />}
              </div>

              <div className="flex flex-col  mb-4 relative">
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
                  // isLoading={loading}
                  changeHandler={setUserData}
                  options={options.departments}
                  isError={errors.department}
                  value={userData.department}
                />
                {errors.department && <ErrorSpan text={errors.department} />}
              </div>

              <div className="flex flex-col  mb-4 relative">
                <label
                  className={`text-[13px] ${
                    errors.attendance ? "text-red-400" : "text-[#313030]"
                  }`}
                  htmlFor="attendance_profile"
                >
                  Attendance Profile
                </label>
                <SelectInput
                  id="attendance_profile"
                  // isLoading={loading}
                  changeHandler={setUserData}
                  options={options.attendance_profiles}
                  isError={errors.attendance}
                  value={userData.attendance_profile}
                />
                {errors.attendance && <ErrorSpan text={errors.attendance} />}
              </div>

              {userDataToEdit.id === undefined && (
                <div className="flex flex-col  mb-4 relative">
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
                    // isLoading={loading}
                    changeHandler={setUserData}
                    options={options.roles}
                    isError={errors.role}
                    value={userData.role}
                  />
                  {errors.role && <ErrorSpan text={errors.role} />}
                </div>
              )}

              <div className="flex flex-col  mb-4 relative">
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
                  // isLoading={loading}
                  changeHandler={setUserData}
                  options={options.positions}
                  isError={errors.position}
                  value={userData.position}
                />
                {errors.position && <ErrorSpan text={errors.position} />}
              </div>

              <div className="flex flex-col mb-4 relative">
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
                  // isLoading={loading}
                  changeHandler={setUserData}
                  options={managerOptions()}
                  isError={errors.manager}
                  value={userData.manager}
                />
                {errors.manager && <ErrorSpan text={errors.manager} />}
              </div>

              <div className="flex flex-col  relative">
                <label
                  className={`text-[13px] text-[#313030] `}
                  htmlFor="copied_managers"
                >
                  Copied Manager
                </label>
                <SelectMultiInput
                  id="copied_managers"
                  // isLoading={loading}
                  changeHandler={setUserData}
                  options={options.employeesName.filter(
                    (optdata) => optdata.value !== userData.manager
                  )}
                  isError={errors.manager}
                  value={userData.copied_managers}
                  isMulti={true}
                />
                {/* {errors.manager && <ErrorSpan text={errors.manager} />} */}
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
                    can_work_home: prev.can_work_home ? 0 : 1,
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
                className={` text-white w-[94px] h-[27px] rounded-[5px] font-[Roboto] bg-[#ff6a6a] text-[13px] ${
                  createUserLoading && "opacity-50"
                } ${updateLoading && "opacity-50"}`}
                onClick={closeModal}
                disabled={createUserLoading || updateLoading}
              >
                Cancel
              </button>
              <Button
                text={`${userDataToEdit.id === undefined ? "Save" : "Update"}`}
                color="#23aaeb"
                fontSize="13px"
                onSubmit={
                  userDataToEdit.id === undefined
                    ? handleSubmitUpdate
                    :handleSubmitUpdate 
                }
                disable={createUserLoading || updateLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForm;
