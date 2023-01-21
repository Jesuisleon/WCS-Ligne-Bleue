import "./css/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

// AXIOS CONFIG

import App from "./App";

const { VITE_BACKEND_URL } = import.meta.env;

axios.defaults.baseURL = VITE_BACKEND_URL;
axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
  "userToken"
)}`;

// AXIOS || CAN BE USED TO LOG EVERY REQUESTS AND RESPONSES

// axios.interceptors.request.use(
//   (request) => {
//     console.log(request);
//     // Edit request config
//     return request;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     // Edit response config
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
