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
      <div className="flex flex-col items-center">
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex text-center justify-between border-b border-gray-400">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-black">
              {userFirstName} {userLastName}
            </div>
            <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
              {userEmail}
            </p>
          </div>
          <div className="sm:flex sm:space-x-4 align-center my-4">
            <Link
              to="/userprofil/changepassword"
              className="w-full sm:w-auto bg-gradient-to-b from-blue-700 to-blue-900 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <div className="text-left">
                <div className="-mt-1 font-sans text-sm font-semibold">
                  Modifier mon mot de passe
                </div>
              </div>
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
        <div className="    ">
          <div className=" flex  items-center flex-col ">
            <h1 className="sm:text-3x1 font-bold py-2 mt-8">Mes Tutoriels</h1>
          </div>

          <div className="  flex  flex-col items-center ">
            {themeFilters
              .filter((e) => e.isChecked === true)
              .map((e) => (
                <div key={e.id} className="w-1/2 ">
                  <div className="mx-auto w-full   bg-gray-50 p-0 ">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full  font-bold h-20 justify-between border-gray-300 items-center text-dark rounded-lg bg-gray-50 border px-4 py-2 text-left text-sm  focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                            <span>{e.value}</span>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-8 w-8 text-black`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="  mb-4">
                            <div className="mt-0 flex flex-col">
                              <div className="overflow-x-auto">
                                <div className="inline-block min-w-full py-2 align-middle">
                                  <div className="overflow-hidden shadow font-ligther text-gray-600 rounded-lg ">
                                    <table className="min-w-full divide-y  divide-gray-300">
                                      {filterTutorialByThemeId(
                                        e.id,
                                        tutorialFiltred
                                      ).map((a) => (
                                        <tbody
                                          key={e.id}
                                          className="divide-y divide-black"
                                        >
                                          <tr className="border rounded-md  border-gray-400">
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
                                            <td className=" text-right bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full w-sm">
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
        </div>
      )}
    </div>
  );
}

export default UserProfil;
