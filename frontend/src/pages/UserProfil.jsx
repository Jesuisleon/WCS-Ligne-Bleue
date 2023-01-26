import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../context/AuthContext";
import filterTutorialByThemeId from "../services/filterTutorialByThemeId";
import { FilterByOptionsSelected } from "../services/utils/utils";

function UserProfil() {
  const { userInfos } = useContext(AuthContext);
  const { userFirstName, userLastName, userEmail, userId } = userInfos;
  const [tutorials, setTutorials] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [themeFilters, setThemeFilters] = useState("");
  const [selectedOption, setSelectedOption] = useState("Tout");

  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const theme = [];
    axios
      .get(`/home`)
      .then((response) => {
        response.data.map((e) =>
          theme.push({ id: e.id, value: e.name, isChecked: true })
        );
      })
      .then(() => {
        if (userId) {
          axios.get(`/journeys-validation/${userId}`).then((res) => {
            setTutorials(res.data);
            setIsLoading(false);
          });
        }
      });
    setThemeFilters(theme);
  }, [userId]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleOptionChange = (index) => {
    const themeFiltersTemp = [...themeFilters];
    themeFiltersTemp[index].isChecked = !themeFiltersTemp[index].isChecked;
    setThemeFilters(themeFiltersTemp);
  };

  const handleUnSelect = () => {
    const themeFiltersChangedToFalse = [];
    themeFilters.forEach(function f(e) {
      e.isChecked = false;
      themeFiltersChangedToFalse.push(e);
    });
    setThemeFilters(themeFiltersChangedToFalse);
  };

  const handleAllSelect = () => {
    const themeFiltersChangedToTrue = [];
    themeFilters.forEach(function f(e) {
      e.isChecked = true;
      themeFiltersChangedToTrue.push(e);
    });
    setThemeFilters(themeFiltersChangedToTrue);
  };

  const tutorialFiltred = FilterByOptionsSelected(tutorials, selectedOption);

  return (
    <div>
      <div className=" flex justify-center items-center mt-12 mb-8">
        <div className="w-full max-w-sm  rounded-md shadow-md bg-gradient-to-b from-blue-700 to-blue-900 dark:border-gray-700 shadow-yellow-400 ">
          <div className="flex justify-end px-4 pt-4" />
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/image/pigeon-voyageur.png"
              alt="img"
            />
            <h1 className="mb-3 text-xl font-medium text-gray-700 dark:text-white">
              {" "}
              Mes informations personnelles:
            </h1>
            <h5 className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Prénom: {userFirstName}
            </h5>
            <h5 className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Nom: {userLastName}
            </h5>
            <span className="text-sm text-gray-700 dark:text-gray-100 mb-6">
              Adresse mail : {userEmail}
            </span>
            <Link
              to="/userprofil/changepassword"
              className="dark:text-white mt-4"
            >
              Changer votre mot de passe
            </Link>
          </div>
        </div>
      </div>

      {!isLoading && (
        <div>
          <div className="inline-flex">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Filtrer par themes{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div
                id="ouverture"
                className="z-10  bg-white  rounded-lg shadow w-60 dark:bg-gray-700"
              >
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                  {themeFilters.map((themfilter, index) => (
                    <li key={themfilter.value}>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          type="checkbox"
                          checked={themfilter.isChecked}
                          onChange={() => handleOptionChange(index)}
                          id="checkbox-item-11"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="checkbox-item-11"
                          className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          {themfilter.value}
                        </label>
                      </div>
                    </li>
                  ))}
                  <button onClick={handleUnSelect} type="button">
                    Décocher tout
                  </button>
                  <button onClick={handleAllSelect} type="button">
                    Cocher tout
                  </button>
                </ul>
              </div>
            )}
          </div>

          <div className="inline-flex">
            <button
              onClick={toggleDropdown2}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Filtrer par état des tutoriel{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen2 && (
              <div
                id="ouverture"
                className="z-10  bg-white  rounded-lg shadow w-60 dark:bg-gray-700"
              >
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        type="radio"
                        name="Tout"
                        value="Tout"
                        checked={selectedOption === "Tout"}
                        onChange={handleSelectedOption}
                        id="checkbox-item-11"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="checkbox-item-11"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Tout
                      </label>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        type="radio"
                        name="Validé"
                        value="Validé"
                        checked={selectedOption === "Validé"}
                        onChange={handleSelectedOption}
                        id="checkbox-item-11"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="checkbox-item-11"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Validé
                      </label>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        type="radio"
                        name="A découvrir"
                        value="A découvrir"
                        checked={selectedOption === "A découvrir"}
                        onChange={handleSelectedOption}
                        id="checkbox-item-11"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="checkbox-item-11"
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        A découvrir
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="px-4 sm:px-6 lg:px-8">
          {themeFilters
            .filter((e) => e.isChecked === true)
            .map((e) => (
              <div key={e.id} className="w-full px-4 pt-2">
                <div className="mx-auto w-full rounded-lg bg-white p-0 ">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full h-20 justify-between items-center text-white rounded-lg bg-gradient-to-b from-blue-700 to-blue-900 px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                          <span>{e.value}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-8 w-8 text-white`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 mb-4">
                          <div className="mt-0 flex flex-col">
                            <div className="overflow-x-auto">
                              <div className="inline-block min-w-full py-2 align-middle">
                                <div className="overflow-hidden shadow rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-300">
                                    {filterTutorialByThemeId(
                                      e.id,
                                      tutorialFiltred
                                    ).map((a) => (
                                      <tbody
                                        key={e.id}
                                        className="divide-y divide-black"
                                      >
                                        <tr className="bg-gradient-to-b from-yellow-300 to-yellow-500">
                                          <td className="py-4 pl-4 pr-3 text-sm">
                                            <div className="flex items-center">
                                              <div className="px-4 py-2 text-sm text-right">
                                                {a.title}
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-4 py-2 text-sm text-right">
                                            <Link to={`/tutorial/${e.id}`}>
                                              {a.user_id
                                                ? "re-faire le tutoriel"
                                                : "Faire le tutoriel !"}
                                            </Link>
                                          </td>
                                          <td className="px-4 py-2 text-sm text-right">
                                            {a.user_id
                                              ? "Validé"
                                              : "A découvrir"}
                                          </td>
                                        </tr>
                                      </tbody>
                                    ))}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserProfil;
