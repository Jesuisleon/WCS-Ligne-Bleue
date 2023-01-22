import { BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import AnimatedRoutes from "@components/AnimatedRoutes";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const { setUserInfos } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (token) {
      axios
        .get(`${VITE_BACKEND_URL}/reconnect`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfos({
            userId: response.data.id,
            userFirstName: response.data.firstname,
            userLastName: response.data.lastname,
            userEmail: response.data.email,
            isAdmin: response.data.admin,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div
      className="
      absolute
      flex
      flex-col
      min-h-screen
      w-screen 
      bg-gradient-to-b 
      from-yellow-100 
      to-yellow-200
      "
    >
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
