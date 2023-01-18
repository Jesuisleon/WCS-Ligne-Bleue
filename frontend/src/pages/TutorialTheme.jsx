import * as ReactRouter from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import axios from "axios";
import { themeTutorialData } from "../data";
import { AuthContext } from "../context/AuthContext";

const { Link, useParams } = ReactRouter;

export default function TutorialTheme() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const [data, setData] = useState();
  const { id } = useParams();
  const { userInfos } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/tutorials/?theme=${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userInfos.isAdmin]);

  const { theme } = useParams();

  const initTutorial = [...themeTutorialData];

  const [listTutorial, setListTutorial] = useState({});

  useEffect(() => {
    const initListTutorial = initTutorial.find(
      (tutorial) => tutorial.theme === theme
    );
    if (initListTutorial) setListTutorial(initListTutorial);
  }, [theme]);

  return (
    <div
      className="
        my-10
        mx-10
        sm:mx-20
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-5
        gap-7
        auto-rows-[minmax(100px,_1fr)]
        sm:auto-rows-[minmax(180px,_2fr)]
        lg:auto-rows-[minmax(220px,_2fr)]
      "
    >
      {data &&
        data.map((tutorial) => (
          <motion.div
            key={tutorial.id}
            initial={{ x: "200%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Link
              key={tutorial.id}
              className="
                bg-white
                h-full
                w-full
                p-8
                sm=p-10
                flex
                flex-col
                justify-between
                rounded-xl
                transition
                duration-200
                ease-in-out
                transform
                hover:scale-110
                shadow-lg
                shadow-yellow-400
                text-center
                "
              to={`/tutorial/${tutorial.id}`}
            >
              <HiCheckCircle className="text-4xl fill-green-500 m-auto" />
              <h1 className="text-xl font-bold">{tutorial.title}</h1>
              <div className="mt-4 mb-10">
                <p className="text-gray-600 mb-5">{tutorial.objectif}</p>
                <div className="bg-gray-400 h-3 rounded-lg mt-2 overflow-hidden">
                  <div className="bg-pink-400 w-1/4 h-full rounded-lg shadow-md" />
                </div>
                <p className="text-gray-600 mt-5 italic">
                  {tutorial.difficulty}
                </p>
              </div>
              <button
                className="
              text-center
              bg-blue-700
              text-white
              py-3
              rounded
              text-sm
              font-semibold
              hover:bg-opacity-75
              "
                type="button"
              >
                Commencer
              </button>
            </Link>
          </motion.div>
        ))}
      {Object.keys(listTutorial).includes("tutorial") &&
        listTutorial.tutorial.map((tutorial) => (
          <motion.div
            key={tutorial.id}
            initial={{ x: "200%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Link
              key={tutorial.id}
              className="
                bg-white
                h-full
                w-full
                p-8
                sm=p-10
                flex
                flex-col
                justify-between
                rounded-xl
                transition
                duration-200
                ease-in-out
                transform
                hover:scale-110
                shadow-lg
                shadow-yellow-400
                text-center
                "
              to={`/tutorial/${tutorial.id}`}
            >
              <HiCheckCircle className="text-4xl fill-green-500 m-auto" />
              <h1 className="text-xl font-bold">{tutorial.title}</h1>
              <div className="mt-4 mb-10">
                <p className="text-gray-600 mb-5">{tutorial.objectif}</p>
                <div className="bg-gray-400 h-3 rounded-lg mt-2 overflow-hidden">
                  <div className="bg-pink-400 w-1/4 h-full rounded-lg shadow-md" />
                </div>
                <p className="text-gray-600 mt-5 italic">Niveau débutant</p>
              </div>
              <button
                className="
                  text-center
                  bg-blue-700
                  text-white
                  py-3
                  rounded
                  text-sm
                  font-semibold
                  hover:bg-opacity-75
                  "
                type="button"
              >
                Commencer
              </button>
            </Link>
          </motion.div>
        ))}

      <div className="flex">
        {userInfos.isAdmin ? (
          <Link
            className="text-red-700 text-xl font-button mx-2"
            to="/createTutorial"
          >
            {" "}
            <p>Créer un tutoriel</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
