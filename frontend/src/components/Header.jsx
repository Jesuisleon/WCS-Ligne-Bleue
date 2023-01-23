import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export default function Header() {
  // function classNames(...classes) {
  //   return classes.filter(Boolean).join(" ");
  // }

  const { userToken, setUserTokenCookie, userInfos } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const { userFirstName, userLastName } = userInfos;
  const navigate = useNavigate();

  const handleDisconnect = (event) => {
    event.stopPropagation();
    setUserTokenCookie(null);
    localStorage.clear();
    navigate("/home");
  };

  const handleRedirectToUserProfil = () => {
    navigate("/userprofile");
  };

  return (
    <header className="bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-blue-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Ligne Bleue</span>
              <img
                className="h-10 w-auto"
                src="/image/logo_la_poste.png"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-blue-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {userToken === false ? (
            <div className="ml-10 space-x-4">
              <Link
                to="/login"
                className="inline-block bg-blue-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                SE CONNECTER
              </Link>
              <Link
                to="/register"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                S'INSCRIRE
              </Link>
            </div>
          ) : (
            <div className="flex-col justify-between items-center ">
              <button
                id="dropdownDefaultButton"
                onClick={handleDropdownToggle}
                data-dropdown-toggle="dropdown"
                className=" z-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {`${userFirstName} ${userLastName} `}{" "}
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
              {showDropdown && (
                <div
                  id="dropdown"
                  className=" absolute  bg-white divide-y divide-gray-100 rounded shadow w-30 dark:bg-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        href="#"
                        onClick={handleRedirectToUserProfil}
                        className="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-black"
                        type="button"
                      >
                        Mon compte
                      </button>
                    </li>
                    <li>
                      <button
                        href="#"
                        onClick={handleDisconnect}
                        className="block  px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-red-600"
                        type="button"
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-blue-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
