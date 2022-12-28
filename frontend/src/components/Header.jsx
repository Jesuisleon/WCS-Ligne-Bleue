import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav
      className="
      min-w-screen 
      h-20
      bg-white border-solid 
      shadow-2xl
      "
    >
      <ul
        className="
        flex
        justify-between
        items-center
        px-4
        text-2xl
        text-blue-800
        font-title
        ">
        <li>
          <Link to="/">
            <img
              alt="Logo La Poste"
              className="h-20"
              src="/image/logo_la_poste.jpeg" />
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="
            antialiased
            font-medium
            "
          >
            Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
