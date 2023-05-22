import React, { useContext, useEffect } from "react";
import CardItem from "./CardItem";
import { useApolloClient } from "@apollo/client";
import { GET_COMPANY_USERS } from "../../graphql";

const CardList = ({searchText,pageNumber,numOfCard,addOptions,openModalHandler, getUrlFromImagePath}) => {
  
  const client = useApolloClient();

  // Get Data from cache
  const employees = client.readQuery({
    query: GET_COMPANY_USERS,
    variables: {first: numOfCard, page: pageNumber,input: searchText}
  })
  
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-[20px] lg:gap-x-[15px] xl:gap-x-[30px] gap-y-[20px] xl:gap-y-[35px]">
        {employees.company_users?.data.length ? (
          employees.company_users.data.map((data) => (
            <CardItem data={data} key={data.id} searchText={searchText} pageNumber={pageNumber} numOfCard={numOfCard} openModalHandler={openModalHandler} addOptions={addOptions} getUrlFromImagePath={getUrlFromImagePath} />
          ))
        ) : (
          <p className="text-sm text-[#8997a4] px-3 font-bolder tracking-wide">Sorry , There is no Employee ...</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
