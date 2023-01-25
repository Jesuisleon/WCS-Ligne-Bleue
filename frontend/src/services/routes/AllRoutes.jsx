import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import Cookies from "js-cookie";

import { AnimatePresence } from "framer-motion";
import Sticky from "react-stickynode";

import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";

import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel";
import Login from "@pages/Login";
import Journey from "@pages/Journey";
import Search from "@pages/Search";
import Tutorial from "@pages/Tutorial/Tutorial";
import TutorialByTheme from "@pages/TutorialsByTheme";
import UserProfil from "@pages/UserProfil";
import TutorialMaker from "@pages/TutorialMaker/TutorialMaker";
import Register from "@pages/Register";
import ChangePassword from "@pages/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../../context/AuthContext";

import NotFound404 from "../../components/NotFound404";

export default function AllRoutes() {
  const { userInfos } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = userInfos !== null;

  let navTitle = "";
  const admin = userInfos.isAdmin === 1;
  const isLog = Cookies.get("userToken");

  switch (location.pathname) {
    case "/home":
      navTitle = "Bienvenue";
      break;
    case "/adminPanel":
      navTitle = "Menu Admin";
      break;
    case "/login":
      navTitle = "Login";
      break;
    case "/journey":
      navTitle = "Mon Parcours";
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
    case "/userprofil":
      navTitle = "Mon Profile";
      break;
    case "/createTutorial":
      navTitle = "Create Tutorial";
      break;
    case "/register":
      navTitle = "Créer un compte";
      break;
    case "/userprofil/changepassword":
      navTitle = "Changer le mot de passe";
      break;
    default:
      navTitle = "Bienvenue";
  }

  return (
    <AnimatePresence>
      <Header key="header" />
      <Sticky enabled top={0} innerZ={20} activeClass="sticky-nav-active">
        <NavigationBlock
          key="navigation"
          title={navTitle}
          navigate={() => navigate(-1)}
        />
      </Sticky>
      <Routes location={location} key={location.pathname}>
        {/* routes public */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/theme/:id" element={<TutorialByTheme />} />
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
    </AnimatePresence>
  );
}
