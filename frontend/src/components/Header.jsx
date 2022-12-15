import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <h1>
        <Link className="simpleLink" to="/login">
          Login
        </Link>
      </h1>

      <h2>
        <Link className="simpleLink" to="/">
          Home
        </Link>
      </h2>
    </div>
  );
}

export default Header;
