import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CardList from "./CardList/CardList";
import AddNewForm from "./AddNewForm";
import { FaPlus } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql";

const ListContainer = ({
  loadingContent,
  paginationInfo,
  pageHandler,
  pageArrowHandler,
  searchHandler,
  pageNumber,
  numOfCard,
  searchText,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [userDataToEdit, setUserDataToEdit] = useState([]);
  const [options, setOptions] = useState({
    departments: [],
    positions: [],
    offices: [],
    attendance_profiles: [],
    employeesName: [],
    roles: [],
  });

  const closeModal = () => {
    setShowModal(false);
    setUserDataToEdit([]);
  };

  const showModalHandler = (data) => {
    setShowModal(true);
    setUserDataToEdit(data);
  };

  const addOptions = (OPTIONS) => {
    setOptions({
      departments: OPTIONS.data.company_departments.data,
      offices: OPTIONS.data.offices.data,
      attendance_profiles: OPTIONS.data.attendance_profiles.data,
      positions: OPTIONS.data.positions.data,
      employeesName: OPTIONS.data.company_users.data,
      roles: OPTIONS.data.profile.company.currentSubscription.plan.roles,
    });
  };

  const [get_options_and_user, { loading: loadingUser }] = useLazyQuery(GET_USER_BY_ID);

  const openModalHandler = async (id) => {
    const DATA = await get_options_and_user({
      variables: {id, first: 100, includeUser: id ? true : false },
      fetchPolicy: "network-only",
      onCompleted: ()=>setShowModal(true)
    });
    addOptions(DATA);
    setUserDataToEdit(DATA.data.user || {});
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);
  return (
    <div className="pl-[35px] pr-[18px] pt-2 min-h-full ">
      {loadingUser && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <div className="bg-[#f7f8f9] px-3 py-5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <SearchForm
            setShowModal={setShowModal}
            searchText={searchText}
            searchHandler={searchHandler}
          />

          {/* Add new Employee Btn */}
          <button
            className="bg-[#2764ac] text-white w-[100px]  h-[30px] rounded-[5px] font-[Roboto] flex items-center justify-center gap-1"
            onClick={() => openModalHandler()}
          >
            <FaPlus /> <span className="text-[13px]">Add new</span>
          </button>
        </div>

        {loadingContent ? (
          <LoadingSpinner />
        ) : (
          <>
            <CardList
              pageNumber={pageNumber}
              numOfCard={numOfCard}
              searchText={searchText}
              // showModalHandler={showModalHandler}
              addOptions={addOptions}
              openModalHandler={openModalHandler}
            />
            <Pagination
              paginationInfo={paginationInfo}
              pageHandler={pageHandler}
              pageArrowHandler={pageArrowHandler}
              numOfCard={numOfCard}
            />
          </>
        )}

        {showModal && (
          <AddNewForm
            closeModal={closeModal}
            userDataToEdit={userDataToEdit}
            pageNumber={pageNumber}
            numOfCard={numOfCard}
            updateLoading={searchText}
            addOptions={addOptions}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default ListContainer;
