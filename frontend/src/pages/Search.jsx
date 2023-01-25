import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
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
    <div
      className="
    flex-grow
    flex
    flex-col
    px-20
    align-center
    
    "
    >
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
          className="bg-gray-700 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Exemple : Tutoriel pour apprendre à allumer sont téléphone "
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {searchResult &&
          searchResult.map((e) => (
            <Link key={e.id} to={`/tutorial/${e.id}`}>
              <div
                key={e.id}
                className="bg-gradient-to-b from-yellow-300 to-yellow-500 p-8 rounded-xl shadow-lg transition duration-200 ease-in-out transform hover:scale-110 text-center "
              >
                <h1 className="text-xl font-medium">{e.title}</h1>
                <h2 className="text-sm font-medium text-gray-700">{e.theme}</h2>
              </div>
            </Link>
          ))}
      </div>
      {isHidden ? null : (
        <div className="bg-gradient-to-b from-blue-700 to-blue-900  h-50% w-50% p-8 sm:p-10 flex flex-col justify-center items-center rounded-xl transition duration-200 ease-in-out transform hover:scale-110 shadow-lg  text-center">
          <img
            className="mx-auto h-12 w-auto mb-4"
            src={logoPoste}
            alt="Workflow"
          />
          <div className="text-xl font-bold text-center flex align-center">
            <BsFillArrowUpCircleFill className="h-8 w-8 text-yellow-400 group-hover:text-[#1d4ed8] mr-2" />
            <span className="text-white">
              Veuillez renseigner ci-dessus votre recherche
            </span>
            <BsFillArrowUpCircleFill className="h-8 w-8 text-yellow-400 group-hover:text-[#1d4ed8] ml-2" />
          </div>
          <div className="text-sm font-medium text-white mb-2">
            <div className="text-xl font-bold text-center">Exemples :</div>
            <ul className="text-left justify-center mb-5 text-base text-white sm:text-lg dark:text-white">
              <li>1- Tutoriel pour apprendre à allumer son téléphone</li>
              <li>2- Comment envoyer un mail</li>
              <li>3- Comment charger son téléphone</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
