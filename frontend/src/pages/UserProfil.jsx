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
        <div className="w-full max-w-sm  rounded-md shadow-md dark:bg-[#3B6CC8] dark:border-gray-700 shadow-yellow-700 ">
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
          <div className="flex-col">
            <div>
              <button onClick={toggleDropdown} type="button">
                Filtrer par themes
              </button>
              {isOpen && (
                <ul>
                  {themeFilters.map((themfilter, index) => (
                    <li key={themfilter.value}>
                      <input
                        type="checkbox"
                        checked={themfilter.isChecked}
                        onChange={() => handleOptionChange(index)}
                      />
                      <label>{themfilter.value}</label>
                    </li>
                  ))}
                  <button onClick={handleUnSelect} type="button">
                    Décocher tout
                  </button>
                  <button onClick={handleAllSelect} type="button">
                    Cocher tout
                  </button>
                </ul>
              )}
            </div>
          </div>
          <div className="flex-col">
            <div>
              <button onClick={toggleDropdown2} type="button">
                Filtrer par état des tutoriel
              </button>
              {isOpen2 && (
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="Tout"
                        value="Tout"
                        checked={selectedOption === "Tout"}
                        onChange={handleSelectedOption}
                      />
                      Tout
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="Validé"
                        value="Validé"
                        checked={selectedOption === "Validé"}
                        onChange={handleSelectedOption}
                      />
                      Validé
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="A découvrir"
                        value="A découvrir"
                        checked={selectedOption === "A découvrir"}
                        onChange={handleSelectedOption}
                      />
                      A découvrir
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="px-4 sm:px-6 lg:px-8">
          {themeFilters
            .filter((e) => e.isChecked === true)
            .map((e) => (
              <div key={e.id} className="w-full px-4 pt-2">
                <div className="mx-auto w-full rounded-2xl bg-white p-0 ">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-200 px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                          <span>{e.value}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="mt-0 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                  <table className="min-w-full divide-y divide-gray-300">
                                    {filterTutorialByThemeId(
                                      e.id,
                                      tutorialFiltred
                                    ).map((a) => (
                                      <tbody
                                        key={e.id}
                                        className="divide-y divide-gray-200 bg-white"
                                      >
                                        <tr key="blabla">
                                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div className="flex items-center">
                                              <div className="h-10 w-10 flex-shrink-0">
                                                {a.title}
                                              </div>
                                            </div>
                                          </td>

                                          <div className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                            <Link to={`/tutorial/${e.id}`}>
                                              {a.user_id
                                                ? "re-faire le tutoriel"
                                                : "Faire le tutoriel !"}
                                            </Link>
                                          </div>
                                          <td className="whitespace-nowrap px-10 py-4 text-sm text-right text-gray-500">
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
