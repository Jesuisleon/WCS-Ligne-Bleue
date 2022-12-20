import React from "react";
import { Link } from "react-router-dom";

export default function Tutorial() {
  return (
    <div>
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
