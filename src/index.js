import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EmployeeProvider from './context/EmployeeProvider';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';



const client = new ApolloClient({
  uri: "http://mawared.pro/graphql",
  headers: {
    authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNDYxZWQ5ZDA5ZDU1NTEwMjJhNTFhZjAyOTBjMjk2YTMyYjNiODJkNGM3YjQyODkyMDNkMzNkNzkyZmNiZTM2N2I2Y2VhODE1YzViNGZjOWMiLCJpYXQiOjE2ODMyMjYyNTYuMTg4OTc1LCJuYmYiOjE2ODMyMjYyNTYuMTg4OTc5LCJleHAiOjE3MTQ4NDg2NTYuMTQ1NzIsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.REQdt9NswoFGQGWExrQVKI7z6W4Ae7XBK0GziZc7wJCvSSFijxnaC-JoRIq9WQQbQYHGydTEwqc47migyjGPZX1dERRJ8y0w46RubjM60OlYwPY91C4rg-a6zzauCe2q4XwajENed5dGFx9UWpBEzob4giiLzie1sszWMqwgzoiTnIgYbpc_1r1vmEK1piUMEY3VcpYgNYJ2u9nJaldk3axzwQIf5XjQ2GGPPxEcWTyCItPm7n4ZGzkTtuRy3LbZvvJ-vVngnrjll4ECxiGM03OjnzsTpNFiO1T7wNCZFEFDLDLWJuO5ZfJOKUxmBkQS5FmAb3WBjJ0UV0xULj1klHjYOng7viJXFngsSAG1GdFHfH69Nv2ZZ-HRfmaEKamZXtAMUoygDMR9sJMWV-N2G5HR6V6vxPyLLJWB4caUuLnUGWTPrbar87ia7CDxTVdW9uRadzkR0xeOQhjc_XdJ1NuCTkuziieXIK1lZAaIica0fwAprPPR-6xUDcAlL8KEazQRDYdKJLi6tuAWkx-KqZDA1EGwZ2np_FcHyAMc3XfhZ3iHdHFTQfakCk-baBP6469j8CO4bFnTwlcROejgvvjJgBrQQTxv2Jx_yewFao-hxnV_ousnbd66DGRVh5hz2IHq1EyKMXZDwy5WZhyn_Rug8hqFj0GpVWyjuht8lKI"
  },
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

