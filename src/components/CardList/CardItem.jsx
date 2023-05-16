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
import Swal from "sweetalert2";
import { useMutation, useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { DELETE_USER, GET_COMPANY_USERS, GET_USER_BY_ID } from "../../graphql";
import LoadingSpinner from "../LoadingSpinner";

const CardItem = ({
  data,
  searchText,
  pageNumber,
  numOfCard,
  showModalHandler,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showName, setShowName] = useState(false);
  // const { deleteEmployee } = useContext(EmployeeContext);
  const client = useApolloClient();
  const [
    deleteUserQL,
    { data: DATADELETE, loading: LoadingDelete, error: ErrorDelete },
  ] = useMutation(DELETE_USER);

  const deleteHandler = (id) => {
    const swalWithClasses = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-400 px-3 py-2 text-white rounded",
        cancelButton: "bg-green-400 px-3 py-2 text-white rounded",
      },
      buttonsStyling: false,
    });

    swalWithClasses
      .fire({
        title: "Are you sure to Delete?",
        text: data.name,
        icon: "warning",
        showCancelButton: true,
        // showLoaderOnConfirm: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const { value: password } = swalWithClasses
            .fire({
              title: "Enter your password",
              input: "password",
              confirmButtonText: "Delete",
              inputPlaceholder: "Enter your password",
              inputAttributes: {
                maxlength: 10,
                autocapitalize: "off",
                autocorrect: "off",
              },
            })
            .then((res) => {
              // if (res.value === "123456") {
              deleteUserQL({
                variables: { id: data.id, password: res.value },
                refetchQueries: [
                  {
                    query: GET_COMPANY_USERS,
                    variables: {
                      first: numOfCard,
                      page: pageNumber,
                      input: searchText,
                    },
                  },
                ],

              onError({networkError,graphQLErrors}) {
                if (graphQLErrors) {
                          graphQLErrors.map(({ extensions }) =>swalWithClasses.fire("Error!", extensions.reason, "error"));
                      }
                      if (networkError) {
                          console.log(" [Network error]:", networkError)
                      };
              },
          
                // TODO: not working
                update(cache, { data }) {
                  // const {company_users} = cache.readQuery({query: GET_COMPANY_USERS});
                  // cache.writeQuery({
                  //   query: GET_COMPANY_USERS,
                  //   data: {
                  //     company_users: {
                  //       data: company_users.data.filter(user=> user.id !== id)
                  //     }
                  //   }
                  // })
                  // cache.modify({
                  //   fields: {
                  //     company_users(existingUsers,{readField}) {
                  //       console.log(existingUsers);
                  //       return existingUsers.data.filter(userRef=> data.id !==readField('id', userRef))
                  //     }
                  //   }
                  // })
                  // cache.modify({
                  //   id: cache.identify(data),
                  //   fields: {
                  //     company_users(existingUsers, {DELETE}){
                  //       return DELETE
                  //     }
                  //   }
                  // })
                },
              })
                .then((res) => {
                  console.log(res);
                  if (res.data.delete_user.status === "success") {
                    Swal.fire({
                      timer: 2000,
                      title: "The User is deleted",
                      icon: "success",
                    });
                  } else {
                    swalWithClasses.fire(
                      "Error!",
                      res.data.delete_user.message,
                      "Error"
                    );
                  }
                })
                .catch((error) => {
                  console.log(error.extensions);
                  // swalWithClasses.fire("Error!", error.message, "error");
                });
            });
        }
      });
  };

  const [get_user_id,{loading: loadingUser}] = useLazyQuery(GET_USER_BY_ID)

  const UpdateUserHandler = async(id) => {
    const user = await get_user_id({variables:{id}})
    showModalHandler(user.data.user);
  };
  const wrapperRef = useRef(null);
  useEffect(() => {
    // console.log(data);
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
    if (e.target.offsetWidth < e.target.scrollWidth) {
      setShowName(true);
    } else {
      setShowName(false);
    }
  }
  return (
    <div className="card-item bg-white pl-4 pr-3 py-3">
      {LoadingDelete && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {loadingUser && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
          <LoadingSpinner />
        </div>
      )}
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13 md:col-end-4">
          <div>
            <img
              src={
                data.img_path
                  ? data.img_path
                  : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt="person"
              className="w-[100px] h-[100px] md:w-[64px] md:h-[64px] rounded-full object-cover mx-auto"
            />
            <div className="flex justify-center gap-10 md:gap-0 md:justify-between items-center text-[#8997a4] text-[14px] mt-[15px] md:mt-[17px] mb-5 md:mb-0">
              <HiPencil
                className="hover:text-cyan-400 cursor-pointer"
                onClick={() => UpdateUserHandler(data.id)}
              />
              <AiOutlinePauseCircle className="" />
              <RiDeleteBin2Fill
                className="hover:text-red-400 cursor-pointer"
                onClick={() => deleteHandler(data.id)}
              />
            </div>
          </div>
        </div>
        {/* flex flex-col justify-between */}
        <div className="col-start-1 md:col-start-4 col-end-13 pl-0 md:pl-[20px] h-full ">
          <div className="border-t md:border-t-0 border-l-0 md:border-l border-[#8997a440] h-full pl-0 md:pl-5 ">
            <div className="text-center md:text-left relative">
              <p
                className="text-[20px] text-[#5c6974] font-[Lato] capitalize text-overflow leading-[1] mb-[5px]"
                onMouseEnter={(e) => isEllipsisActive(e)}
                onMouseLeave={() => setShowName(false)}
              >
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
              <p className="text-[13px] text-[#313030] font-[Roboto] h-[19px]">
                {data.position?.name}
              </p>
              <p className="text-[10px] text-[#5c6974] font-[Roboto] mb-[11px] h-[19px]">
                {data.department?.name}
              </p>
            </div>
            <div className="flex justify-between items-center mt-[13px]">
              <AttendLabel text={data.attendance_profile?.name} />

              <div className="flex items-center gap-2">
                <div
                  className="bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center flex justify-center items-center hover:shadow relative "
                  onMouseEnter={() => setShowEmail(true)}
                  onMouseLeave={() => setShowEmail(false)}
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
                  onMouseEnter={() => setShowPhone(true)}
                  onMouseLeave={() => setShowPhone(false)}
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
                  className={`bg-[#eaeef0] w-[19px] h-[19px] rounded-full text-center ${
                    showDetails && "details-shadow"
                  }  hover:shadow cursor-pointer relative flex justify-center items-center`}
                  onMouseEnter={() => setShowDetails(true)}
                  onMouseLeave={() => setShowDetails(false)}

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
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px] text-overflow">
                            {data.office?.name}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Role
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.position?.name}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2  ">
                            Copied Manager
                          </p>
                          <p
                            className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px] text-overflow"
                            title={data.copied_managers[0]?.name}
                          >
                            {data.copied_managers[0]?.name}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Joining Date
                          </p>
                          <p className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px]">
                            {data.starts_at}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[#8997a4] text-[10px] font-[Roboto] mb-2 ">
                            Manager
                          </p>
                          <p
                            className="text-[#313030] text-[10px] font-[Roboto] -mt-[5px] text-overflow"
                            title={data.manager?.name}
                          >
                            {data.manager?.name}
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
