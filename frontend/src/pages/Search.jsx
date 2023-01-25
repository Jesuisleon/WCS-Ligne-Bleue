import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import logoPoste from "../../public/image/logo_la_poste.png";
import SearchTutorial from "../services/utils/searchFonction";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [tutorialInfos, setTutorialInfos] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    axios.get(`/tutorials-search`).then((response) => {
      setTutorialInfos(response.data);
    });
  }, []);

  useEffect(() => {
    if (tutorialInfos) {
      const searchResulteArray = SearchTutorial(searchValue, tutorialInfos);
      setSearchResult(searchResulteArray);
      setIsHidden(searchValue !== "");
    } else {
      setIsHidden(false);
    }
  }, [searchValue]);

  return (
    <div className="flex-grow flex flex-col px-60 py-5 align-center ">
      {isHidden ? null : (
        <div className="bg-gradient-to-b from-blue-700 to-blue-900 p-8 sm:p-4 flex flex-col justify-center items-center rounded-xl  shadow-lg  text-center">
          <img
            className="mx-auto h-12 w-auto mb-4"
            src={logoPoste}
            alt="Workflow"
          />
          <div className="text-2xl font-bold text-center flex align-center">
            <FaSearch className="h-8 w-8 text-yellow-400 group-hover:text-[#1d4ed8] mr-2 mb-4 " />
            <span className="text-white">
              Veuillez renseigner ci-dessous votre recherche
            </span>
          </div>
          <div className="text-sm font-medium text-white ">
            <div className="text-xl font-bold text-left mb-auto">
              Exemples :
            </div>
            <ul className="text-left  justify-center mt-2 text-base text-white sm:text-lg dark:text-white">
              <li className="mb-2">
                1- Tutoriel pour apprendre à allumer son téléphone
              </li>
              <li className="mb-2">2- Comment envoyer un mail</li>
              <li>3- Comment charger son téléphone</li>
            </ul>
            <div className="d-grid place-items-center">
              <BsFillArrowDownSquareFill className="h-8 w-8 text-yellow-400 group-hover:text-[#1d4ed8] mt-4 ml-auto mr-auto" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {searchResult &&
          searchResult.map((e) => (
            <Link key={e.id} to={`/tutorial/${e.id}`}>
              <motion.div
                key={e.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0,
                  ease: [0, 0.2, 0.2, 0.2],
                }}
                className="bg-gradient-to-b from-yellow-300 to-yellow-500 p-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-110 text-center "
              >
                <h1 className="text-lg font-medium overflow-hidden">
                  {e.title}
                </h1>
                {/* <h1 className="text-xl font-medium break-words">{e.title}</h1> */}
                <h2 className="text-sm font-medium text-gray-700">{e.theme}</h2>
              </motion.div>
            </Link>
          ))}
      </div>

      <div className="mb-6">
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
          className="bg-gray-700  border-indigo-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 border-4  focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500  dark:focus:border-indigo-700"
          placeholder="Exemple : Tutoriel pour apprendre à allumer sont téléphone "
          required
        />
      </div>
    </div>
  );
}
