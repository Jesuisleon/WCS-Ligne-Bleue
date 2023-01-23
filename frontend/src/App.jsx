import { BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import Routes from "@services/routes/AllRoutes";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { setUserInfos } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      axios
        .get(`/reconnect`)
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
        <Routes />
      </Router>
    </div>
  );
}

export default App;
