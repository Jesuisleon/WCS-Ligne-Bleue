import { React, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { userToken, setUserTokenCookie, userInfos } = useContext(AuthContext);

  const { userLastName } = userInfos;
  const navigate = useNavigate();

  const handleDisconnect = (event) => {
    event.stopPropagation();
    setUserTokenCookie(null);
    navigate("/home");
  };

  return (
    <header
      className="
    w-screen
    bg-white 
    z-30
    bg-gradient-to-b 
    from-blue-700 
    to-blue-900
    border-b-2
    border-blue-900
    "
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 sm:py-6 flex items-center justify-between lg:border-none">
          <div className="hidden xs:flex items-center">
            <Link to="/">
              <span className="sr-only">Ligne Bleue</span>
              <img
                className="h-8 sm:h-10 w-auto"
                src="/image/logo_la_poste.png"
                alt=""
              />
            </Link>
          </div>
          {userToken && userInfos.isAdmin ? (
            <div className="mt-auto mb-auto">
              <Link
                to="/adminPanel"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
              >
                Admin
              </Link>
            </div>
          ) : null}
          {userToken === null ? (
            <div className="ml-10 flex items-center space-x-2 sm:space-x-5">
              <Link
                to="/login"
                className="inline-block bg-yellow-400 py-2 px-2 sm:px-4 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-100"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Créer un compte
              </Link>
            </div>
          ) : (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                  ${open ? "" : "text-opacity-90"}
                  group inline-flex items-center rounded-md bg-yellow-400 px-3 py-2 text-base font-medium text-blue-700 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span>{`Bonjour ${userLastName} `}</span>
                    <ChevronDownIcon
                      className={`${open ? "" : "text-opacity-70"}
                    ml-2 h-5 w-5 text-blue-700 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-40 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7">
                          <Link to="/userprofile">
                            <button
                              type="button"
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 text-start"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                                {/* Heroicon name: outline/support */}
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  Mon profil
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Gérer mon profil
                                </p>
                              </div>
                            </button>
                          </Link>

                          <button
                            type="button"
                            onClick={handleDisconnect}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                              {/* Heroicon name: outline/support */}
                            </div>
                            <div className="ml-4 text-start">
                              <p className="text-base font-medium text-gray-900">
                                Se déconnecter
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Se déconnecter de mon compte
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )}
        </div>
      </nav>
    </header>
  );
}
