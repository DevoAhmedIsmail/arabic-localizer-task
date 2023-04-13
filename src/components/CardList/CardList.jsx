import React, { useContext } from "react";
import CardItem from "./CardItem";
import { EmployeeContext } from "../../context/EmployeeProvider";

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

const CardList = () => {
  const { employees, searchText } = useContext(EmployeeContext);
  const filteredEmployees = employees.filter((data) =>
    data.name.includes(searchText)
  );

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[45px] gap-y-[35px]">
        {filteredEmployees.length ? (
          filteredEmployees.map((data) => (
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
