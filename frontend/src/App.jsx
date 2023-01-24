import { BrowserRouter as Router } from "react-router-dom";
import { useContext, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import AllRoutes from "@services/routes/AllRoutes";
import { AuthContext } from "./context/AuthContext";
import { NavigationContext } from "./context/NavigationContext";

function App() {
  const { setUserInfos } = useContext(AuthContext);
  const { setNavigationTheme } = useContext(NavigationContext);

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
    axios.get(`/home`).then((response) => {
      setNavigationTheme(response.data);
    });
  }, []);

  return (
    <div
      className="
      absolute
      flex
      flex-col
      min-h-screen
      w-screen 
      "
    >
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
