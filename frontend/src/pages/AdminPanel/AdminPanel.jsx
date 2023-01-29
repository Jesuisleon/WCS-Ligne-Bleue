import { React, useState, useEffect, useContext } from "react";
import * as ReactRouter from "react-router-dom";

import { NavigationContext } from "@context/NavigationContext";

import TutorialList from "@pages/AdminPanel/TutorialList";
import CommentsList from "@pages/AdminPanel/CommentsList";

import DropdownMenu from "@components/DropdownMenu";

const { Link } = ReactRouter;

// FOR THEME CONTENT
function ThemeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
      />
    </svg>
  );
}

export default function AdminPanel() {
  const [commentTutoId, setCommentTutoId] = useState();
  const [commentTitle, setCommentTitle] = useState();
  const [open, setOpen] = useState(false);

  // NAVIGATION THEME FROM CONTEXT
  const { navigationTheme } = useContext(NavigationContext);
  // THEMES DATA
  const [themesFiltered, setThemesFiltered] = useState([]);

  // LOADING DATA
  const [loading, setLoading] = useState(true);

  // FILTERS THEMES WHEN DATA FINISH TO LOAD
  useEffect(() => {
    if (loading === false) {
      const theme = navigationTheme.map((e) => ({
        id: e.id,
        name: e.name,
        isChecked: true,
        available: true,
      }));
      // setThemesFiltered(theme);
      setThemesFiltered(theme);
    }
  }, [loading]);

  // SET LOADING TO FALSE WHEN DATA IS LOADED
  useEffect(() => {
    if (navigationTheme.length > 0) {
      setLoading(false);
    }
  }, [navigationTheme]);

  // CHECKBOXES FILTERS
  const setThemesFilters = (e) => {
    const updatedThemes = e.filter((theme) => {
      return theme.isChecked === true;
    });
    setThemesFiltered(updatedThemes);
  };

  // LOADING BEFORE GETTING DATA
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      {/* TUTORIALS LIST */}
      {/* TITLE */}
      <div className="mt-4 px-4 xl:px-10">
        <div className="pb-2 border-b border-gray-200">
          <h3 className="text-base font-body text-gray-800 first-letter:capitalize">
            Mon parcours
          </h3>
        </div>
        {/* MENUS */}
        <div className="w-full flex-inline pt-4 sm:py-4 sm:flex gap-7 items-center ">
          <Link to="/createtutorial">
            <p className="flex gap-2 items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Nouveau Tutoriel
            </p>
          </Link>
          <div className="flex justify-center">
            <DropdownMenu
              onChange={setThemesFilters}
              title="Filtrer les thémes"
              type="checkbox"
              data={themesFiltered}
              icon={<ThemeIcon />}
            />
          </div>
        </div>
      </div>
      <TutorialList
        adminThemes={themesFiltered}
        setCommentTutoId={setCommentTutoId}
        setCommentTitle={setCommentTitle}
        setOpen={setOpen}
      />
      {open && (
        <CommentsList
          commentTutoId={commentTutoId}
          commentTitle={commentTitle}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
