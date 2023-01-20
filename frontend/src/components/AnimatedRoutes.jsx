import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel";
import Login from "@pages/Login";
import Journey from "@pages/Journey";
import Search from "@pages/Search";
import Tutorial from "@pages/Tutorial";
import TutorialTheme from "@pages/TutorialsByTheme";
import UserProfil from "@pages/UserProfil";
import TutorialMaker from "@pages/TutorialMaker/TutorialMaker";
import Register from "@pages/Register";
import Header from "@components/Header";
import ChangePassword from "@pages/ChangePassword";
import { AnimatePresence, motion } from "framer-motion";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import NavigationBlock from "@components/NavigationBlock";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import NotFound404 from "./NotFound404";
import ProtectedRoute from "./ProtectedRoute";

function AnimatedRoutes() {
  const { userInfos } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let navTitle = "";
  const admin = userInfos.isAdmin === 1;
  const isLog = Cookies.get("userToken");

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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading === true);
  }, [isLoading]);

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

  useEffect(() => {
    if (userInfos.userFirstName) {
      setIsLoading(true);
    }
  }, [userInfos]);

  return (
    <AnimatePresence>
      <Header key="header" />
      <NavigationBlock
        key="navigation"
        title={navTitle}
        navigate={() => navigate(-1)}
      />
      <Routes location={location} key={location.pathname}>
        {/* routes public */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/theme/:id" element={<TutorialTheme />} />
        <Route path="/tutorial/:id" element={<Tutorial />} />
        <Route path="/register" element={<Register />} />
        {/* routes protégé si utilisateur est loggé */}
        {isLoading && (
          <Route>
            <Route
              path="/userProfile"
              element={
                <ProtectedRoute status={isLog}>
                  <UserProfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journey"
              element={
                <ProtectedRoute status={isLog}>
                  <Journey />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userprofil/changepassword"
              element={
                <ProtectedRoute status={isLog}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Route>
        )}
        {/* Route protégé admin */}
        {isLoading && (
          <Route>
            <Route
              path="/userProfile"
              element={
                <ProtectedRoute status={admin}>
                  <UserProfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createTutorial"
              element={
                <ProtectedRoute status={admin}>
                  <TutorialMaker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminPanel"
              element={
                <ProtectedRoute status={admin}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Route>
        )}
        {/* Si la route est différente que toute les routes existantes renvois 404NotFound */}
        <Route path="*" element={<NotFound404 />} />
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
