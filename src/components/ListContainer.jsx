import React from "react";
import SearchForm from "./SearchForm";
import CardList from "./CardList/CardList";

const ListContainer = () => {
  return (
    <div className=" p-5 pt-2 pl-0 min-h-full ">
      <div className="bg-[#f7f8f9] px-3 py-5">
        <SearchForm />
        <CardList />
      </div>
    </div>
  );
};

export default ListContainer;
