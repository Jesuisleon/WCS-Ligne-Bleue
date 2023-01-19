import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchTutorial from "../services/searchFonction";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [tutorialInfos, setTutorialInfos] = useState("");

  useEffect(() => {
    const { VITE_BACKEND_URL } = import.meta.env;
    axios.get(`${VITE_BACKEND_URL}/tutorialssearch`).then((response) => {
      setTutorialInfos(response.data);
    });
  }, []);

  useEffect(() => {
    if (tutorialInfos) {
      const searchResulteArray = SearchTutorial(searchValue, tutorialInfos);
      setSearchResult(searchResulteArray);
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
          Veuillez renseigner ci-dessous votre recherche
        </label>
        <input
          type="input"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Exemple : Tutoriel pour apprendre à allumer sont téléphone "
          required
        />
      </div>
      <div>
        {searchResult &&
          searchResult.map((e) => (
            <Link key={e.id} to={`/tutorial/${e.id}`}>
              <div key={e.id} className="mt-2">
                <h1>{e.title}</h1>
                <h2>{e.theme}</h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
