import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="min-w-screen bg-yellow-400">
      <ul className="flex justify-between p-10 text-3xl text-blue-700 font-title">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
