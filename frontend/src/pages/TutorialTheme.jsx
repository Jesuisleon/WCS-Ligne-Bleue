import * as ReactRouter from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import NavigationBlock from "@components/NavigationBlock";

import { themeTutorialData } from "../data";

const { Link, useParams, useNavigate } = ReactRouter;

export default function TutorialTheme() {
  const { theme } = useParams();
  const navigate = useNavigate();

  const initTutorial = [...themeTutorialData];

  const [listTutorial, setListTutorial] = useState({});

  useEffect(() => {
    const initListTutorial = initTutorial.find(
      (tutorial) => tutorial.theme === theme
    );
    if (initListTutorial) setListTutorial(initListTutorial);
  }, [theme]);

  return (
    <div>
      <Header />
      <NavigationBlock navigate={() => navigate(-1)} title={theme} />
      <div className="flex flex-col justify-center items-start mx-2">
        {Object.keys(listTutorial).includes("tutorial") &&
          listTutorial.tutorial.map((tutorial) => (
            <Link
              key={tutorial.id}
              className="text-blue-700 text-xl font-button"
              to={`/${theme}/${tutorial.id}`}
            >
              {tutorial.title}
            </Link>
          ))}
      </div>
      <Link
        className="text-red-700 text-xl font-button mx-2"
        to="/createTutorial"
      >
        {" "}
        Créer un tutoriel
      </Link>
    </div>
  );
}
