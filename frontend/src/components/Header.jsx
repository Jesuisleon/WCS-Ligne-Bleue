import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { userToken, setUserTokenCookie, userFirstName, userLastName } =
    useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();
  // const location = useLocation();

  const handleDisconnect = (event) => {
    event.stopPropagation();
    setUserTokenCookie(null);
    navigate("/home");
    // if (location.pathname === '/UserProfile') {
    //   navigate('/home');
    // }
  };

  const handleRedirectToUserProfil = () => {
    navigate("/userprofile");
  };

  return (
    <nav
      className="
      min-w-screen 
      h-10
      sm:h-20
      bg-white border-solid 
      shadow-2xl
      z-30
      "
    >
      <ul
        className="
        flex
        justify-between
        items-center
        px-4
        font-title
        "
      >
        <li>
          <Link to="/">
            <img
              alt="Logo La Poste"
              className="h-10 sm:h-20"
              src="/image/logo_la_poste.jpeg"
            />
          </Link>
        </li>

        <li>
          {!userToken ? (
            <Link to="/login">
              <h1
                className="
              antialiased
              font-medium
              text-blue-800
              sm:text-2xl
              hover:text-blue-600
          "
              >
                Se connecter
              </h1>
            </Link>
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
                  className="  bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-600"
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
                        className="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-red-600"
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
        </li>
      </ul>
    </nav>
  );
}

export default Header;
