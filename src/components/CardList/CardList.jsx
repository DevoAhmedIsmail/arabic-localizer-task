import React, { useContext, useEffect } from "react";
import CardItem from "./CardItem";
import { EmployeeContext } from "../../context/EmployeeProvider";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_COMPANY_USERS } from "../../graphql";

// const DATA = [
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Absent",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Weekend",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Present",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Present",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Absent",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek",

//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Present",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Weekend",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
//     {
//         name: "Ahmed Ismail Ali",
//         position: "HR Head",
//         department: "Business Development",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//         attendance: "Absent",
//         office: "Arabic localizer",
//         role: "Employee",
//         copiedManager: "Mohamed tarek",
//         joinDate: "12/12/2018",
//         manager: "Mohamed tarek"
//     },
// ]

const CardList = ({searchText,pageNumber,numOfCard}) => {
  
  const client = useApolloClient();

  // Get Data from cache
  const employees = client.readQuery({
    query: GET_COMPANY_USERS,
    variables: {first: numOfCard, page: pageNumber,input: searchText}
  })
  
  // console.log("Read Query: ", employees.company_users.data);

  

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-[20px] lg:gap-x-[15px] xl:gap-x-[30px] gap-y-[20px] xl:gap-y-[35px]">
        {employees.company_users?.data.length ? (
          employees.company_users.data.map((data) => (
            <CardItem data={data} key={data.id} />
          ))
        ) : (
          <p className="text-sm text-[#8997a4] px-3 font-bolder tracking-wide">Sorry , There is no Employee ...</p>
        )}
      </div>
    </div>
  );
};

export default CardList;
