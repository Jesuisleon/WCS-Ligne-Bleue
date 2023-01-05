import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

import { AnimatePresence, motion } from "framer-motion";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import NavigationBlock from "@components/NavigationBlock";

function AnimatedRoutes({ setUser, userToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  let titleForPage = "";

  if (location.pathname === "/") {
    titleForPage = "Bienvenue";
  }
  if (location.pathname === "/journey") {
    titleForPage = "Parcours";
  }
  if (location.pathname === "/search") {
    titleForPage = "Recherche";
  }
  if (location.pathname === "/adminPanel") {
    titleForPage = "Admin Panel";
  }
  if (location.pathname === "/login") {
    titleForPage = "Connexion";
  }
  if (location.pathname === "/register") {
    titleForPage = "Inscription";
  }
  if (location.pathname === "/createTutorial") {
    titleForPage = "Créer un tutoriel";
  }
  if (location.pathname === "/UserProfil") {
    titleForPage = "Profil";
  }
  if (location.pathname === "/:theme") {
    titleForPage = "Thème";
  }
  if (location.pathname === "/:theme/:id") {
    titleForPage = "Tutoriel";
  }
  const [showBottomArrow, setShowBottomArrow] = useState(true);
  const [showTopArrow, setShowTopArrow] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/Register" ||
      location.pathname === "/createTutorial"
    ) {
      setShowBottomArrow(false);
      setShowTopArrow(false);
    }
  }, [location]);

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
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/createTutorial"
    ) {
      setShowBottomArrow(false);
      setShowTopArrow(false);
    } else {
      setShowBottomArrow(true);
      setShowTopArrow(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <Header key="header" userToken={userToken} setUser={setUser} />
      <NavigationBlock
        key="navigation"
        title={titleForPage}
        navigate={() => navigate(-1)}
      />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:theme" element={<TutorialTheme />} />
        <Route path="/:theme/:id" element={<Tutorial />} />
        <Route path="/createTutorial" element={<CreateTutorial />} />
        <Route path="/UserProfil" element={<UserProfil />} />
        <Route path="/Register" element={<Register />} />
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
