import React from "react";
import { Link } from "react-router-dom";
import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";
import { themeTutorialData } from "../data";

export default function Home() {
  function withoutAccent(str) {
    const accent = [
      /[\300-\306]/g,
      /[\340-\346]/g, // A, a
      /[\310-\313]/g,
      /[\350-\353]/g, // E, e
      /[\314-\317]/g,
      /[\354-\357]/g, // I, i
      /[\322-\330]/g,
      /[\362-\370]/g, // O, o
      /[\331-\334]/g,
      /[\371-\374]/g, // U, u
      /[\321]/g,
      /[\361]/g, // N, n
      /[\307]/g,
      /[\347]/g, // C, c
    ];
    const noaccent = [
      "A",
      "a",
      "E",
      "e",
      "I",
      "i",
      "O",
      "o",
      "U",
      "u",
      "N",
      "n",
      "C",
      "c",
    ];

    for (let i = 0; i < accent.length; i += 1) {
      str.replace(accent[i], noaccent[i]);
    }

    return str;
  }
  withoutAccent("tést");

  return (
    <div>
      <Header />
      <NavigationBlock title="Bienvenue" />
      <div className="flex flex-col justify-center items-start mx-2">
        {themeTutorialData.map((data) => (
          <Link
            key={data.theme}
            className="text-blue-700 text-xl font-button"
            to={`/${data.theme}`}
          >
            {data.theme}
          </Link>
        ))}
        <div>
          <Link className="text-blue-700 text-xl" to="/search">
            Rechercher un tutoriel
          </Link>
        </div>
        <div>
          <Link className="text-blue-700 text-xl" to="/tofollow">
            Pour poursuivre
          </Link>
        </div>
      </div>
    </div>
  );
}
