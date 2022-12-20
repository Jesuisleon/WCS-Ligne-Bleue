import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel";
import Login from "@pages/Login";
import Journey from "@pages/Journey";
import Search from "@pages/Search";
import Tutorial from "@pages/Tutorial";
import TutorialTheme from "@pages/TutorialTheme";
import UserProfil from "@pages/UserProfil";
import CreateTutorial from "@pages/CreateTutorial";
import Register from "@pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:theme" element={<TutorialTheme />} />
        <Route path="/:theme/:id" element={<Tutorial />} />
        <Route path="/createTutorial" element={<CreateTutorial />} />
        <Route path="/UserProfil" element={<UserProfil />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
