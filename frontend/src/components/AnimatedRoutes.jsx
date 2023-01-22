import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";

import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel";
import Login from "@pages/Login";
import Journey from "@pages/Journey";
import Search from "@pages/Search";
import Tutorial from "@pages/Tutorial/Tutorial";
import TutorialTheme from "@pages/TutorialsByTheme";
import UserProfil from "@pages/UserProfil";
import TutorialMaker from "@pages/TutorialMaker/TutorialMaker";
import Register from "@pages/Register";
import ChangePassword from "@pages/ChangePassword";

import Sticky from "react-stickynode";

function AnimatedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  let navTitle = "";

  switch (location.pathname) {
    case "/home":
      navTitle = "Bienvenue";
      break;
    case "/adminPanel":
      navTitle = "Admin Panel";
      break;
    case "/login":
      navTitle = "Login";
      break;
    case "/journey":
      navTitle = "Journey";
      break;
    case "/search":
      navTitle = "Search";
      break;
    case "/theme/:id":
      navTitle = "Theme";
      break;
    case "/tutorial/:id":
      navTitle = "Tutorial";
      break;
    case "/userProfil":
      navTitle = "User Profil";
      break;
    case "/createTutorial":
      navTitle = "Create Tutorial";
      break;
    case "/register":
      navTitle = "Register";
      break;
    case "/changePassword":
      navTitle = "Change Password";
      break;
    default:
      navTitle = "Bienvenue";
  }

  return (
    <AnimatePresence>
      <Header key="header" />
      <Sticky enabled top={0} innerZ={1000} activeClass="sticky-nav-active">
        <NavigationBlock
          key="navigation"
          title={navTitle}
          navigate={() => navigate(-1)}
        />
      </Sticky>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/search" element={<Search />} />
        <Route path="/theme/:id" element={<TutorialTheme />} />
        <Route path="/tutorial/:id" element={<Tutorial />} />
        <Route path="/createTutorial" element={<TutorialMaker />} />
        <Route path="/userprofile" element={<UserProfil />} />
        <Route path="/userprofil/changepassword" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
