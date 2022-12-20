import React from "react";
import { Link } from "react-router-dom";
import user from "./DataTest";

export default function UserPageTest() {
  return (
    <div>
      {user.map((e) => (
        <li>
          <Link className="simpleLink" to={`/profil/${e.name}`}>
            {e.name}
          </Link>
        </li>
      ))}
      blabla
    </div>
  );
}
