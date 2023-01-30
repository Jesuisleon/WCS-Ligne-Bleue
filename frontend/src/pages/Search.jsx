import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { AuthContext } from "@context/AuthContext";

import { motion } from "framer-motion";

import { FaSearch } from "react-icons/fa";

import TutorialCard from "@components/TutorialCard";
import SearchTutorial from "@services/utils/searchFonction";

export default function Search() {
  const { userJourney } = useContext(AuthContext);

  const [data, setData] = useState();

  const [tutorial, setTutorial] = useState([]);

  const [searchValue, setSearchValue] = useState("");


  const [searchResult, setSearchResult] = useState([]);
  console.log("🚀 ~ file: Search.jsx:24 ~ Search ~ searchResult", searchResult)

  // TRANSFORM RESULT WITH USER ID JOURNEY
  useEffect(() => {
    if (userJourney.length > 0 && searchResult.length > 0) {
      // search searchResult id equal to userJourney id and add userJourney user_id and creation_date data to tutorial state
      const userJourneyData = searchResult.map((e) => {
        if (userJourney.find((j) => j.id === e.id)) {
          return {
            ...e,
            user_id: userJourney.filter((j) => j.id === e.id)[0].user_id,
            creation_date: userJourney.filter((j) => j.id === e.id)[0]
              .creation_date,
          };
        }
        return {
          ...e,
          user_id: null,
          creation_date: null,
        };
      });
      setTutorial(userJourneyData);
    } else {
      setTutorial(searchResult);
    }
  }, [searchResult]);

  // FETCH TUTORIALS FROM DATABASE
  useEffect(() => {
    axios.get(`/tutorials`).then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setSearchResult(SearchTutorial(searchValue, data));
    }
  }, [searchValue]);

  return (
    <div className="flex-grow flex flex-col px-4 sm:px-6 md:px-8 lg:px-60 py-5 align-center">
      <div className="bg-gradient-to-b from-blue-700 to-blue-900 p-4 sm:p-8 md:p-6 lg:p-8 flex flex-col justify-center items-center rounded-lg shadow-lg text-center">
        <div className="text-xl font-medium text-center flex align-center">
          <FaSearch className="h-6 w-6 text-yellow-400 group-hover:text-[#1d4ed8] mr-2 mb-4" />
          <span className="text-white">
            Veuillez renseigner ci-dessous votre recherche
          </span>
        </div>
        <div className="text-sm font-medium text-white">
          <div className="text-lg font-medium text-left mb-auto">
            Exemples :
          </div>
          <ul className="text-left justify-center mt-2 text-base italic">
            <li className="mb-2">
              "Tutoriel pour apprendre à allumer son téléphone"
            </li>
            <li className="mb-2">"Comment envoyer un mail"</li>
            <li>"Comment charger son téléphone"</li>
          </ul>
        </div>
      </div>
      <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-6">
        <label
          htmlFor="search"
          className="flex justify-center mb-2 text-sm font-medium text-gray-900 dark:text-dark mt-2"
        >
          {" "}
        </label>
        <input
          type="input"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-white border-indigo-800 text-gray-900 text-sm rounded-md focus:ring-blue-500 border-2 focus:border-blue-500 block w-full p-2 sm:p-3 md:p-4 lg:p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-indigo-700"
          placeholder="Exemple : Tutoriel pour apprendre à allumer sont téléphone"
          required
        />
      </div>
      <div className="my-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-2 ">
        {tutorial &&
          tutorial.map((e) =>
            e.published === true ? (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0,
                  ease: [0, 0.2, 0.2, 0.2],
                }}
              >
                <TutorialCard
                  title={e.title}
                  difficulties={e.difficulty_name}
                  objective={e.objective}
                  themeId={e.theme_id}
                  tutorialId={e.id}
                  validate={e.user_id}
                  date={e.creation_date}
                />
              </motion.div>
            ) : null
          )}
      </div>
    </div>
  );
}
