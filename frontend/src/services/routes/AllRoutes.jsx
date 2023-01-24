import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { useContext } from "react";

import Cookies from "js-cookie";

import { AnimatePresence } from "framer-motion";
import Sticky from "react-stickynode";

import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";
import { NavigationContext } from "@context/NavigationContext";

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

  const { navigationTitle } = useContext(NavigationContext);

  const navTitle = navigationTitle || "Bienvenue";
  const location = useLocation();

  const isLoading = userInfos !== null;

  const admin = userInfos.isAdmin === 1;
  const isLog = Cookies.get("userToken");

  return (
    <AnimatePresence>
      <Header key="header" />
      <Sticky enabled top={0} innerZ={20} activeClass="sticky-nav-active">
        <NavigationBlock key="navigation" title={navTitle} />
      </Sticky>
      <Routes location={location} key={location.pathname}>
        {/* routes public */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/theme/:themeId/" element={<TutorialByTheme />} />
        <Route
          path="/theme/:themeID/tutorial/:tutorialId"
          element={<Tutorial />}
        />
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
