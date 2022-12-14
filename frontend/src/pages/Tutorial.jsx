import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Tutorial() {
  return (
    <div>
      <Header />
      <div>
        <Link className="simpleLink" to="/tutorialTheme">
          {" "}
          Retour
        </Link>
      </div>
      Tutorial
    </div>
  );
}
