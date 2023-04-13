import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/UserProvider";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ListContainer from "./components/ListContainer";

function App() {
  // const {users,addUsers} = useContext(UserContext);

  return (
    <div className="App">
      <Sidebar />

      <div className="screen-margin">
        <Navbar />
        <ListContainer />
      </div>
    </div>
  );
}

export default App;
