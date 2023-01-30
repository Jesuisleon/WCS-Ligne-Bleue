import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { NavigationContext } from "@context/NavigationContext";
import { AuthContext } from "@context/AuthContext";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import DropdownMenu from "@components/DropdownMenu";
import TutorialCard from "@components/TutorialCard";

import Loading from "@components/Loading";
import { adminLookingOtherProfile } from "../services/utils/utils";

// FOR TUTORIAL CONTENT
const TutorialRadioContent = [
  {
    id: 1,
    name: "Tous les tutoriels",
    isChecked: true,
    available: true,
  },
  {
    id: 2,
    name: "Tutoriels à découvrir",
    isChecked: false,
    available: true,
  },
  {
    id: 3,
    name: "Tutoriels terminés",
    isChecked: false,
    available: true,
  },
];

function TutorialIcon() {
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
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    </svg>
  );
}

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

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function UserProfil() {
  // USER INFOS FROM CONTEXT
  const { userInfos } = useContext(AuthContext);
  const { userId } = useParams();
  const [infosUser, setInfosUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userContextId = parseInt(userId, 10);
  const navigate = useNavigate();

  const adminLookOtherProfile = adminLookingOtherProfile(
    userInfos.isAdmin,
    userContextId,
    userInfos.userId
  );

  // TUTORIAL DATA
  const [tutorialsFiltered, setTutorialsFiltered] = useState([]);

  // GET TUTORIALS FROM DATABASE WITH USER ID JOURNEY
  useEffect(() => {
    if (userId) {
      axios
        .get(`/journeys-validation/${userId}`)
        .then((res) => {
          const tutorials = res.data.filter((tutorial) => tutorial.published);
          tutorials.forEach((tutorial) => {
            tutorial.isChecked = true;
          });
          setTutorialsFiltered(tutorials);
        })
        .then(() => {
          if (userId) {
            axios
              .get(`/users/${userId}`)
              .catch(() => {
                return navigate("/Error");
              })
              .then((res) => {
                if (!res) {
                  throw new Error("Le chargement du profil a échoué");
                }
                setInfosUser({
                  userFirstName: res.data.firstname,
                  userLastName: res.data.lastname,
                  userEmail: res.data.email,
                  isAdmin: res.data.admin,
                });
                setIsLoading(false);
              });
          }
        });
    }
  }, [userInfos]);

  // NAVIGATION THEME FROM CONTEXT
  const { navigationTheme } = useContext(NavigationContext);
  // THEMES DATA
  const [themesFiltered, setThemesFiltered] = useState([]);

  // FUNCTION TO FILTER THEME WITHOUT TUTORIAL
  function updateThemes(themes, tutorials) {
    const updatedThemes = themes.map((theme) => {
      return {
        ...theme,
        available:
          tutorials.filter((tutorial) => tutorial.theme_id === theme.id)
            .length !== 0,
      };
    });

    setThemesFiltered(updatedThemes);
  }

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
      updateThemes(theme, tutorialsFiltered);
    }
  }, [loading]);

  // SET LOADING TO FALSE WHEN DATA IS LOADED
  useEffect(() => {
    if (navigationTheme.length > 0 && tutorialsFiltered.length > 0) {
      setLoading(false);
    }
  }, [navigationTheme, tutorialsFiltered]);

  // CHECKBOXES FILTERS
  const setThemesFilters = (e) => {
    const updatedThemes = e.filter((theme) => {
      return theme.isChecked === true;
    });
    setThemesFiltered(updatedThemes);
  };

  // UPDATE TUTORIALS WITH RADIO FILTERS
  const updateTutorials = (e) => {
    const updatedTutorials = [...tutorialsFiltered];
    if (e === 3) {
      updatedTutorials.forEach((tutorial) => {
        if (tutorial.user_id === null) {
          tutorial.isChecked = false;
        } else {
          tutorial.isChecked = true;
        }
      });
    } else if (e === 2) {
      updatedTutorials.forEach((tutorial) => {
        if (tutorial.user_id === null) {
          tutorial.isChecked = true;
        } else {
          tutorial.isChecked = false;
        }
      });
    } else {
      updatedTutorials.forEach((tutorial) => {
        tutorial.isChecked = true;
      });
    }

    updateThemes(
      themesFiltered,
      updatedTutorials.filter(({ isChecked }) => isChecked)
    );
    return updatedTutorials;
  };

  // RADIO FILTERS
  const setTutorialsFilters = (e) => {
    const checkedRadio = e.filter((radio) => {
      return radio.isChecked === true;
    });
    const updatedTutorials = updateTutorials(checkedRadio[0].id);
    setTutorialsFiltered(updatedTutorials);
  };

  // OPEN ACCORDION
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // LOADING BEFORE GETTING DATA
  if (loading) return <Loading />;

  return !isLoading ? (
    <div className="px-4 sm:px-14 my-6 w-full">
      {/* MY PROFIL */}
      {/* TITLE */}
      <div className="pb-2 border-b border-gray-200">
        <h3 className="text-base font-body text-gray-800 first-letter:capitalize">
          {!adminLookOtherProfile
            ? "Mes informations personnelles"
            : "Informations personnelles de l'utilisateur"}
        </h3>
      </div>
      {/* USER INFO */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 sm:items-center py-6 sm:py-8">
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-black first-letter:capitalize">
            {`${infosUser.userFirstName} ${infosUser.userLastName}`}
          </div>
          <p className="text-base text-gray-500 sm:text-base dark:text-gray-400">
            {!adminLookOtherProfile && infosUser.userEmail}
          </p>
        </div>
        {!adminLookOtherProfile && (
          <Link to="/userprofil/changepassword">
            <p className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              modifier mon mot de passe
            </p>
          </Link>
        )}
      </div>

      {/* MY JOURNEY */}
      {/* TITLE */}
      <div className="mt-4">
        <div className="pb-2 pt-10 border-gray-200">
          <h3 className="text-base font-body text-gray-800 first-letter:capitalize">
            {!adminLookOtherProfile
              ? "Mes Tutoriels"
              : `Parcours de ${infosUser.userFirstName} ${infosUser.userLastName}`}
          </h3>
        </div>
        {/* MENUS */}
        <div className="w-full flex gap-6 items-center border-y">
          <DropdownMenu
            onChange={setTutorialsFilters}
            title="Filtrer les tutoriels"
            type="radio"
            data={TutorialRadioContent}
            icon={<TutorialIcon />}
          />
          <DropdownMenu
            onChange={setThemesFilters}
            title="Filtrer les thèmes"
            type="checkbox"
            data={themesFiltered}
            icon={<ThemeIcon />}
          />
        </div>
      </div>
      {/* THEMES */}
      {themesFiltered.map((theme, index) => (
        <Accordion
          key={theme.id}
          open={open === index + 1}
          className="text-gray-700"
          icon={<Icon id={index + 1} open={open} />}
        >
          {theme.available === true && (
            <AccordionHeader
              onClick={() => handleOpen(index + 1)}
              className="bg-gray-50 px-4 text-base sm:text-xl text-start"
            >
              {theme.name}
            </AccordionHeader>
          )}
          <AccordionBody>
            {tutorialsFiltered.map((tutorial) => (
              <div key={tutorial.id}>
                {tutorial.theme_id === theme.id && tutorial.isChecked && (
                  // TUTORIALS
                  <TutorialCard
                    title={tutorial.title}
                    objective={tutorial.objective}
                    date={tutorial.creation_date}
                    difficulties={tutorial.difficulty_name}
                    themeId={theme.id}
                    tutorialId={tutorial.id}
                    validate={tutorial.user_id}
                  />
                )}
              </div>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  ) : (
    <Loading />
  );
}

export default UserProfil;
