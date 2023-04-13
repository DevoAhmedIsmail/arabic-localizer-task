import React, { createContext, useState } from "react";
import nextId from "react-id-generator";
export const EmployeeContext = createContext();


const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");

  const addEmployee = (user) => {
    setEmployees((prev) => [...prev, {...user,id:nextId()}]);
  };

  const deleteEmployee = (userID) => {
    setEmployees(employees.filter(employee=> employee.id !== userID))
  }
  
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        setSearchText,
        searchText,
        deleteEmployee
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
