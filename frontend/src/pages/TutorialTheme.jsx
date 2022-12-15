import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function TutorialTheme() {
  return (
    <div>
      <Header />

      <Link className="simpleLink" to="/">
        {" "}
        Retour
      </Link>
      <div>
        <Link className="simpleLink" to="/tutorial">
          {" "}
          block de tutorial
        </Link>
      </div>
    </div>
  );
}
