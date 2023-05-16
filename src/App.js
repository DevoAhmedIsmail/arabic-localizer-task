import "./App.css";
import ListContainer from "./components/ListContainer";
import Layout from "./pages/Layout";
import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./context/EmployeeProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import { GET_COMPANY_USERS } from "./graphql";

const TOKKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiODhmYTFkNzdmZWIzNGZmODdjODEyZTFmNzBiYjBiMzQzNWI5NmRhYjk3Mzc0YWRmMDFhN2Y0MTNlNGRiYzRlMjY3OTA0MjNkNDJiYWQ4MDUiLCJpYXQiOjE2ODM1NTAxNDAuMTU5Mjg1LCJuYmYiOjE2ODM1NTAxNDAuMTU5Mjg5LCJleHAiOjE3MTUxNzI1NDAuMTMyNjcsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.bGoE3z0KgTura1eYpKpGpclzECBnyR65thfmL1phcwATJbWfd4-IHWfgV-OpjAaqhjPsDy_bk3jtAM4HqnQ6zxRTcTRxyqlmha_0lWHLn8J0FC4P10lAobKf_RkURcfFsqGSLfH7YeNESQCoqLgRTy9g2YJXYKSe7BQAeXUqRURiQPbZMEmRATCXcl39LjkBqpTGGLnvIFX8zOdYmXwRgJBFObBSlgX25jkuiYyog_XrVrN-g2BGQ7KM7nCGfpcs-n3_IHeBS2cYepT2B0r2NddkaEHDNpRjcWFRbJPGCIRPfiytj2oLM21pvcMEwuR4SmD-GkhgQDsKlZA_7dfxboipUbFIogMZDrbx435-Ft_dhOUhIJ7AhCNOxy5PNm5Wf49mlWwCg4Nenujo4SoJ9NeD-0Ad8kXJ831pw5CrCKn5tb6b1LG8N4Z2TT1YiqR4yzpsq1Fxd6Q-j4I2TGdG19Q3hzSSX4m4JavzEg2ZYce2DPGLmBop4_RI4e_dGL0yS8ZB8Xo4UXdGbqPgKb5ll312rpMVaVULsd1KuIjFvpXaQ0DmZX-bwihGBO3M-XcZ7t3rJC0RVz3q0Pxw0PSzWikXaghOZCxqYIjtVfrdeMqAeMwyXKo1j6MRJ0Q8KZSpGMWAbIgK-bRwJT-wNtGB3rJSGBGxVTINewKa4Ld7xPE";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfCard, setNumOfCard] = useState(16);
  const [searchText, setSearchText] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_USERS, {
    variables: { first: numOfCard, page: pageNumber, input: searchText },
    fetchPolicy: "cache-first"
  });

  // const { setAllEmployees } = useContext(EmployeeContext);

  // Change page number
  const pageHandler = (num) => {
    setPageNumber(num);
    // refetch({first: 16, page: pageNumber,input: ""})
  };

  // Change page with arrow
  const pageArrowHandler = (num) => {
    setPageNumber(pageNumber + num);
    // refetch({first: 16, page: pageNumber,input: ""})
  };

  // Search
  const searchHandler = (text) => {
    setSearchText(text);
    setPageNumber(1)
    // refetch({first: 16, page: pageNumber, input: text})
  };

  useEffect(() => {
    // data && setAllEmployees(data.company_users.data);
    // console.log(data);
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <Layout>
        <ListContainer
          loadingContent={loading}
          paginationInfo={data?.company_users.paginatorInfo}
          pageHandler={pageHandler}
          pageArrowHandler={pageArrowHandler}
          pageNumber={pageNumber}
          numOfCard={numOfCard}
          searchText={searchText}
          searchHandler={searchHandler}
        />
      </Layout>
    </div>
  );
}

export default App;
