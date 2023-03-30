import { React, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const {
    userToken,
    setUserTokenCookie,
    userInfos,
    setUserInfos,
    setUserJourney,
  } = useContext(AuthContext);
  const { userFirstName, userId } = userInfos;
  const navigate = useNavigate();

  const handleDisconnect = (event) => {
    event.stopPropagation();
    setUserTokenCookie(null);
    setUserJourney([]);
    setUserInfos({});
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
    border-b-2x
    border-blue-900
    "
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-3 sm:py-6 flex items-center justify-between lg:border-none">
          <div className="hidden xs:flex items-center">
            <Link to="/home">
              <span className="sr-only">Ligne Bleue</span>
              <img
                className="h-8 sm:h-12 w-auto"
                src="/image/logo_la_poste.png"
                alt="logo"
              />
            </Link>
          </div>
          {userToken && userInfos.isAdmin ? (
            <div className="mt-auto mb-auto hidden sm:block">
              <Link
                to="/adminpanel"
                className="flex gap-2 w-fit rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
                </svg>
                Menu Admin
              </Link>
            </div>
          ) : null}
          {userToken === null ? (
            <div className="sm:ml-10 flex items-center space-x-2 sm:space-x-5">
              <Link
                to="/login"
                className="inline-block bg-yellow-400 py-1 sm:py-2 px-2 sm:px-4 border border-transparent rounded-md text-base font-medium text-blue-700 hover:bg-blue-100"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="inline-block bg-white py-1 sm:py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
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
                    <span>{`Bonjour ${userFirstName} `}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className={`${open ? "" : "text-opacity-70"}
                    ml-2 h-4 w-4 text-blue-700 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
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
                          <Link to={`/userprofile/${userId} `}>
                            <Popover.Button
                              type="button"
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 text-start w-full"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">
                                  Mon profil
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Gérer mon profil
                                </p>
                              </div>
                            </Popover.Button>
                          </Link>
                          {userToken && userInfos.isAdmin ? (
                            <div className="mt-auto mb-auto sm:hidden block">
                              <Link to="/adminpanel">
                                <Popover.Button
                                  type="button"
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 text-start w-full"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      Menu Admin
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Gérer le site
                                    </p>
                                  </div>
                                </Popover.Button>
                              </Link>
                            </div>
                          ) : null}
                          <button
                            type="button"
                            onClick={handleDisconnect}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 w-full"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white sm:h-12 sm:w-12">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                              </svg>
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
