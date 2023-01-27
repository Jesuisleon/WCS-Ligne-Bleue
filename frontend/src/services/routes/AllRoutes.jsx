import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { useContext } from "react";

import Cookies from "js-cookie";

import { AnimatePresence } from "framer-motion";
import Sticky from "react-stickynode";

import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import { NavigationContext } from "@context/NavigationContext";

import Home from "@pages/Home";
import AdminPanel from "@pages/AdminPanel/AdminPanel";
import Login from "@pages/Login";
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
  const location = useLocation();

  const themeId =
    location.pathname.includes("theme") && location.pathname.split("/")[2];

  // Set the icon of the theme as props
  const { navigationTheme } = useContext(NavigationContext);
  let themeIcon;
  let themeTitle;
  if (navigationTheme && themeId) {
    themeIcon = navigationTheme.filter((e) => e.id === parseInt(themeId, 10))[0]
      .icon;
    themeTitle = navigationTheme.filter(
      (e) => e.id === parseInt(themeId, 10)
    )[0].name;
  }

  // Set the title of the page as props
  const { navigationTitle } = useContext(NavigationContext);

  // Wait for the userInfos to be loaded
  const { userInfos } = useContext(AuthContext);

  const isLoading = userInfos !== null;

  const admin = userInfos.isAdmin === 1;
  const isLog = Cookies.get("userToken");

  return (
    <AnimatePresence>
      <Header key="header" />
      <Routes location={location} key={location.pathname}>
        {/* routes public */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={
            <>
              <Sticky
                enabled
                top={0}
                innerZ={20}
                activeClass="sticky-nav-active"
              >
                <Breadcrumb navigation="home" title="Bienvenue" />
              </Sticky>
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/theme/:themeId/"
          element={
            <>
              <Sticky
                enabled
                top={0}
                innerZ={20}
                activeClass="sticky-nav-active"
              >
                <Breadcrumb navigation="theme" themeTitle={themeTitle} />
              </Sticky>
              <TutorialByTheme />
            </>
          }
        />
        <Route
          path="/theme/:themeId/tutorial/:tutorialId"
          element={
            <>
              <Sticky
                enabled
                top={0}
                innerZ={20}
                activeClass="sticky-nav-active"
              >
                <Breadcrumb
                  navigation="tutorial"
                  themeTitle={themeTitle}
                  tutorialTitle={navigationTitle}
                />
              </Sticky>
              <Tutorial themeIcon={themeIcon} />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* routes protégé si utilisateur est loggé */}
        {isLoading && (
          <Route>
            <Route
              path="/userProfile/:id"
              element={
                <ProtectedRoute status={isLog}>
                  <UserProfil />
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
              path="/userprofile"
              element={
                <ProtectedRoute status={admin}>
                  <UserProfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createtutorial/:tutorialId"
              element={
                <ProtectedRoute status={admin}>
                  <TutorialMaker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createtutorial/"
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
