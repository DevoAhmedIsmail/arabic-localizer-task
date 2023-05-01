import "./App.css";
import ListContainer from "./components/ListContainer";
import Layout from "./pages/Layout";

function App() {
  // const {employees,addEmployee} = useContext(EmployeeContext);

  return (
    <div className="App">
      <Layout>
        <ListContainer />
      </Layout>
    </div>
  );
}

export default App;
