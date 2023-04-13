import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import AddNewForm from "./AddNewForm";
import { EmployeeContext } from "../context/EmployeeProvider";

const SearchForm = () => {
  const [showModal, setShowModal] = useState(false);

  const { setSearchText,searchText } = useContext(EmployeeContext);


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
    <div>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="bg-white relative h-[30px] px-[26px] flex-1 rounded shadow-sm">
          <BsSearch className="text-[#23aaeb] absolute top-1/2 -translate-y-1/2 left-[26px] text-[16px]" />
          <input
            className="pl-9 w-full h-full font-[Roboto] text-[#707070] focus:outline-none"
            placeholder="Search"
            onChange={(e)=>setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <button className="bg-[#2764ac] text-white w-[100px] h-[30px] rounded-[5px] font-[Roboto] flex items-center justify-center gap-1" onClick={()=>setShowModal(true)}>
          <FaPlus /> Add new
        </button>
        {showModal && <AddNewForm closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default SearchForm;
