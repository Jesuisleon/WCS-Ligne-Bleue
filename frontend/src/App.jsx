import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "@components/AnimatedRoutes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { userToken, setUser } = useContext(AuthContext);

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
        <AnimatedRoutes setUser={setUser} userToken={userToken} />
      </Router>
    </div>
  );
}

export default App;
