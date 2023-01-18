import React, { useState, useEffect } from "react";
import SearchTutorial from "../services/searchFonction";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const tutorials = [
    {
      id: 1,
      tutorialName: "Conecter son téléphone aux wi-fi",
      hashtag: ["téléphone"],
    },
    {
      id: 2,
      tutorialName: "Utiliser son téléphone mobile",
      hashtag: ["utiliser", "téléphone", "mobile"],
    },
    {
      id: 3,
      tutorialName: "Eteindre son ordinateur",
      hashtag: ["eteindre", "ordinateur"],
    },
    {
      id: 4,
      tutorialName: "Eteindre son téléphone",
      hashtag: ["eteindre", "téléphone"],
    },
    {
      id: 5,
      tutorialName: "Utiliser son ordinateur",
      hashtag: ["utiliser", "ordinateur"],
    },
    {
      id: 6,
      tutorialName: "Utiliser sa tablette",
      hashtag: ["utiliser", "tablette"],
    },
    {
      id: 7,
      tutorialName: "Eteindre sa tablette",
      hashtag: ["eteindre", "tablette"],
    },
  ];

  useEffect(() => {
    const searchResulteArray = SearchTutorial(searchValue, tutorials);
    setSearchResult(searchResulteArray);
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
      {searchResult &&
        searchResult.map((e) => (
          <div key={e.id} className="mt-2">
            <h1>{e.tutorialName}</h1>
            <h2>{e.hastag}</h2>
          </div>
        ))}
    </div>
  );
}
