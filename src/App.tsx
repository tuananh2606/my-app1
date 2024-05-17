import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import Options from "./components/pages/Options";

export const axiosHandler = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosHandler.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const res = {
      ...response,
      test: "ok",
    };
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}>
            <Route path="/option1" element={<Options />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
