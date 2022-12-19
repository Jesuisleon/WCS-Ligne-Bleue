import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2> Bienvenue </h2>
      <div>
        <Link className="simpleLink" to="/tutorialTheme">
          tutorialTheme
        </Link>
      </div>
      <div>
        <Link className="simpleLink" to="/search">
          Search
        </Link>
      </div>
    </div>
  );
}
