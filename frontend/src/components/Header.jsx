import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { userToken, setUserTokenCookie, userFirstName, userLastName } =
    useContext(AuthContext);

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
    navigate("/UserProfil");
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
            <div>
              <button
                type="button"
                className="
                antialiased
                font-medium
                text-blue-800
                sm:text-2xl
                hover:text-blue-600
            "
                onClick={handleRedirectToUserProfil}
              >
                {`${userFirstName} ${userLastName} `}
              </button>

              <br />
              <button
                type="button"
                className="inline-flex items-center
                px-6 py-2 border border-transparent
                shadow-sm text-base font-medium
                rounded-md text-white bg-indigo-800
               hover:bg-yellow-400 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 "
                onClick={handleDisconnect}
              >
                Se déconnecter
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
