import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
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
