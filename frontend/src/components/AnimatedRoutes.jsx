import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
import Header from "@components/Header";
import ChangePassword from "@pages/ChangePassword";
import { AnimatePresence, motion } from "framer-motion";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import NavigationBlock from "@components/NavigationBlock";

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

  const [showBottomArrow, setShowBottomArrow] = useState(false);
  const [showTopArrow, setShowTopArrow] = useState(false);

  const [isScrollUpPlaying, setIsScrollUpPlaying] = useState(true);
  const [isScrollDownPlaying, setIsScrollDownPlaying] = useState(true);

  function scrollDown() {
    window.scrollTo(0, window.scrollY + window.innerHeight);
  }

  function scrollUp() {
    window.scrollTo(0, window.scrollY - window.innerHeight);
  }

  function handleScroll() {
    setShowBottomArrow(
      window.scrollY < document.body.offsetHeight - window.innerHeight
    );
    setShowTopArrow(window.scrollY > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <Header key="header" />
      <NavigationBlock
        key="navigation"
        title={navTitle}
        navigate={() => navigate(-1)}
      />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/search" element={<Search />} />
        <Route path="/theme/:id" element={<TutorialTheme />} />
        <Route path="/tutorial/:id" element={<Tutorial />} />
        <Route path="/createTutorial" element={<CreateTutorial />} />
        <Route path="/userprofile" element={<UserProfil />} />
        <Route path="/userprofil/changepassword" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showTopArrow && (
        <motion.div
          className="fixed top-10 right-5 sm:right-10"
          animate={
            isScrollUpPlaying
              ? {
                  y: 10,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 50,
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    delay: 0.5,
                  },
                }
              : "init"
          }
          initial="init"
          onHoverStart={() => setIsScrollUpPlaying(false)}
          onHoverEnd={() => setIsScrollUpPlaying(true)}
          onClick={scrollUp}
          key="scrollUp"
        >
          <GoArrowUp className="bg-blue-700 hover:bg-blue-600 rounded-full p-3 text-6xl sm:text-7xl lg:text-7xl text-white cursor-pointer z-10" />
        </motion.div>
      )}
      {showBottomArrow && (
        <motion.div
          className="fixed bottom-10 right-5 sm:right-10"
          animate={
            isScrollDownPlaying
              ? {
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 50,
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  },
                }
              : "init"
          }
          initial="init"
          onHoverStart={() => setIsScrollDownPlaying(false)}
          onHoverEnd={() => setIsScrollDownPlaying(true)}
          onClick={scrollDown}
          key="scrollDown"
        >
          <GoArrowDown className="bg-blue-700 hover:bg-blue-600 rounded-full p-3 text-6xl sm:text-7xl lg:text-7xl text-white cursor-pointer " />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
