import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { EmployeeContext } from "../context/EmployeeProvider";

const SearchForm = () => {

  const { setSearchText,searchText } = useContext(EmployeeContext);

  return (
    <div className="bg-white relative h-[30px] px-[26px] flex-1 rounded-[5px] shadow-sm">
      <BsSearch className="text-[#23aaeb] absolute top-1/2 -translate-y-1/2 left-[26px] text-[16px]" />
      <input
        className="pl-9 w-full h-full font-[Roboto] text-[#707070] text-[14px] focus:outline-none"
        placeholder="Search"
        onChange={(e)=>setSearchText(e.target.value)}
        value={searchText}
      />
    </div>
  );
};

export default SearchForm;
