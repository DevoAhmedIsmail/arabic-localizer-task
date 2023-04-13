import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ListContainer from "./components/ListContainer";

function App() {
  // const {employees,addEmployee} = useContext(EmployeeContext);

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
