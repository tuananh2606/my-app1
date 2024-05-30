import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useState } from "react";
import { IntlProvider } from "react-intl";
import { LocaleContext } from "./components/LocaleContext";
import Layout from "./components/layout/Layout";
import {
  HomePage,
  LoginPage,
  Option,
  Photo,
  PostDetails,
} from "./components/pages";
import ErrorPage from "./components/pages/ErrorPage";
import { loader as homeLoader } from "./components/pages/HomePage";

import enMessages from "./extracted/en.json";
import viMessages from "./lang/vi.json";

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

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader,
        children: [
          {
            path: "/:option",
            element: <Option />,
          },
          {
            path: "/photos",
            element: <Photo />,
          },
          {
            path: "/post/:id",
            element: <PostDetails />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

let initLocale: string = "en";
if (localStorage.getItem("language") === "vi") {
  initLocale = "vi";
} else if (localStorage.getItem("language") === "en") {
  initLocale = "en";
}

const getMessage = (initLocale: string) => {
  switch (initLocale) {
    case "en":
      return enMessages;
    case "vi":
      return viMessages;
  }
};

function App() {
  const [locale, setLocale] = useState(initLocale);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale={initLocale}
        messages={getMessage(locale)}
      >
        <RouterProvider router={router} />{" "}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

export default App;
