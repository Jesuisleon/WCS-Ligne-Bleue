import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { HiChevronDown } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
import filterTutorialByThemeId from "../services/filterTutorialByThemeId";
import { FilterByOptionsSelected } from "../services/utils/utils";

function UserProfil() {
  const { userInfos } = useContext(AuthContext);
  const { userId } = userInfos;
  const [infosUser, setInfosUser] = useState("");
  const [tutorials, setTutorials] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [themeFilters, setThemeFilters] = useState("");
  const [selectedOption, setSelectedOption] = useState("Tout");

  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

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
          });
        }
      })
      .then(() => {
        if (userId) {
          axios.get(`/users/${userId}`).then((res) => {
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
      {!isLoading && (
        <div className="flex-col flex items-center  ">
          <div className="w-full sm:w-1/2 p-4 sm:p-8 flex text-center justify-between border-b border-gray-400">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-black">
                {infosUser.userFirstName} {infosUser.userLastName}
              </div>
              <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                {infosUser.userEmail}
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
      )}

      {!isLoading && (
        <fieldset
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className="w-1/4 px-4 sm:px-6 lg:px-8 mt-2"
        >
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            Filtrer par themes <HiChevronDown size="20" />
          </button>
          <div
            className={`${
              showDropdown ? "absolute" : "hidden"
            }  bg-gradient-to-b 
          from-gray-100 
          to-gray-200 border-t border-b border-gray-200 divide-y divide-gray-200 py-1`}
          >
            <button
              type="button"
              className="inline-flex items-center mx-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleUnSelect}
            >
              Aucun
            </button>
            <button
              type="button"
              className="inline-flex items-center mx-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              onClick={handleAllSelect}
            >
              Tous
            </button>
            {themeFilters &&
              themeFilters.map((themfilter, index) => (
                <div
                  key={themfilter.value}
                  className="relative flex items-start px-2 py-2"
                >
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="checkbox-item-11"
                      className="font-medium text-gray-700 select-none"
                    >
                      {themfilter.value}
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="checkbox-item-11"
                      value=""
                      type="checkbox"
                      checked={themfilter.isChecked}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      onChange={() => handleOptionChange(index)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </fieldset>
      )}

      {!isLoading && (
        <fieldset
          onMouseEnter={() => setShowDropdown2(true)}
          onMouseLeave={() => setShowDropdown2(false)}
          className="w-1/4 px-4 sm:px-6 lg:px-8 mt-2"
        >
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown2}
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
          >
            Filtrer par état des tutoriel <HiChevronDown size="20" />
          </button>
          <div
            className={`${
              showDropdown2 ? "absolute" : "hidden"
            }  bg-gradient-to-b 
          from-gray-100 
          to-gray-200 border-t border-b border-gray-200 divide-y divide-gray-200 py-1`}
          >
            <div className="relative flex items-start px-2 py-2">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor="checkbox-item-11"
                  className="font-medium text-gray-700 select-none"
                >
                  Tout
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id="checkbox-item-11"
                  name="Tout"
                  value="Tout"
                  type="radio"
                  checked={selectedOption === "Tout"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={handleSelectedOption}
                />
              </div>
            </div>

            <div className="relative flex items-start px-2 py-2">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor="checkbox-item-11"
                  className="font-medium text-gray-700 select-none"
                >
                  Validé
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  id="checkbox-item-11"
                  type="radio"
                  name="Validé"
                  value="Validé"
                  checked={selectedOption === "Validé"}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={handleSelectedOption}
                />
              </div>
            </div>

            <div className="relative flex items-start px-2 py-2">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor="checkbox-item-11"
                  className="font-medium text-gray-700 select-none"
                >
                  A découvrir
                </label>
              </div>
              <div className="ml-3 flex items-center h-5">
                <input
                  type="radio"
                  name="A découvrir"
                  value="A découvrir"
                  checked={selectedOption === "A découvrir"}
                  onChange={handleSelectedOption}
                  id="checkbox-item-11"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {!isLoading && (
        <div className="    ">
          <div className=" flex  items-center flex-col ">
            <h1 className="text-2xl font-bold py-2 mt-8">Mes Tutoriels</h1>
          </div>

          <div className="  flex  flex-col items-center  ">
            {themeFilters
              .filter((e) => e.isChecked === true)
              .map((e) => (
                <div key={e.id} className="w-1/2 ">
                  <div className="mx-auto w-full   bg-gray-50 p-0 ">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full  font-bold h-20 justify-between border-gray-400 items-center text-dark rounded-lg bg-gray-200 border px-4 py-2 text-left text-sm  focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
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
                                <div className="inline-block min-w-full w-1/2 align-middle">
                                  <div className="overflow-hidden shadow font-ligther text-gray-600 rounded ">
                                    <table className="min-w-full divide-y  ">
                                      {filterTutorialByThemeId(
                                        e.id,
                                        tutorialFiltred
                                      ).map((a) => (
                                        <tbody
                                          key={e.id}
                                          className=" divide-black"
                                        >
                                          <tr className="border rounded-md  border-gray-400">
                                            <td className="py-4 pl-4 pr-3 text-sm">
                                              <div className="flex items-center">
                                                <div className=" py-2 text-sm text-right">
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

                                            <td>
                                              <div
                                                className={`flex text-center text-xs font-medium py-1 rounded-full max-w-max ${
                                                  a.user_id
                                                    ? "bg-green-500 text-green-100"
                                                    : "bg-indigo-100 text-indigo-800"
                                                }`}
                                              >
                                                {a.user_id
                                                  ? "Validé"
                                                  : "A découvrir"}
                                              </div>
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
