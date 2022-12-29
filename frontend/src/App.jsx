import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "@components/AnimatedRoutes";

function App() {
  return (
    <div
      className="
      flex
      flex-col
      min-h-screen
      min-w-screen 
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
