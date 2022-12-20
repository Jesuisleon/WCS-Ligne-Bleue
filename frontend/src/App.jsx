import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel";
import Login from "@pages/Login";
import Journey from "@pages/Journey";
import Search from "@pages/Search";
import Tutorial from "@pages/Tutorial";
import TutorialTheme from "@pages/TutorialTheme";
import UserProfil from "@pages/UserProfil";
import Header from "@components/Header";
import Register from "@pages/Register";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/tutorialTheme" element={<TutorialTheme />} />
        <Route path="/UserProfil" element={<UserProfil />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
