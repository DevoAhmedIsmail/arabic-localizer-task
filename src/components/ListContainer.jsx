import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CardList from "./CardList/CardList";
import AddNewForm from "./AddNewForm";
import { FaPlus } from "react-icons/fa";


const ListContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showModal]);
  return (
    <div className="pl-[35px] pr-[18px] pt-2 min-h-full ">
      <div className="bg-[#f7f8f9] px-3 py-5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <SearchForm setShowModal={setShowModal} />

          {/* Add new Employee Btn */}
          <button className="bg-[#2764ac] text-white w-[100px]  h-[30px] rounded-[5px] font-[Roboto] flex items-center justify-center gap-1" onClick={()=>setShowModal(true)}>
            <FaPlus /> <span className="text-[13px]">Add new</span>
          </button>
        </div>
        <CardList />
        {showModal && <AddNewForm closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default ListContainer;
