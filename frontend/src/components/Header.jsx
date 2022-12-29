import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
        </li>
      </ul>
    </nav>
  );
}

export default Header;
