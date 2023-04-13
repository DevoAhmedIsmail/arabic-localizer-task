import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
    const [users, setUsers] = useState([{name: 'Ahmed'}]);
    const addUsers = (user) => {
        setUsers((prev)=> [...prev, user])
      }
  return (
    <UserContext.Provider value={{
        users,
        addUsers
    }}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider