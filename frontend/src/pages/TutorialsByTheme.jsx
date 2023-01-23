import * as ReactRouter from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

const { Link, useParams } = ReactRouter;

const themeTutorialData = [
  { id: 1, theme: "Utiliser ligne Bleue", icon: "/image/telephone.png" },
  {
    id: 2,
    theme: "Utiliser mon téléphone",
    icon: "/image/phone2.gif",
    tutorial: [
      {
        id: 1,
        title: "Arrêter et démarrer le téléphone",
        description: "",
        objectif: "Nous allons éteindre et allumer ton téléphone",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 2,
        title: "Utiliser un QR code ",
        description: "",
        objectif: "Apprenons à utiliser un QR code",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 3,
        title: "manipuler écran tactile ",
        description: "",
        objectif: "Savez vous manipuler un écran tactile ?",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 4,
        title: "Téléphoner",
        description: "",
        objectif: "Apprenons à téléphoner",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 5,
        title: "Différence : SMS, mail, message",
        description: "",
        objectif:
          "Savez-vous la différence entre un SMS, un mail et un message ?",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 6,
        title: "Envoyer et recevoir SMS",
        description: "",
        objectif: "Vous allez apprendre à envoyer et recevoir des SMS",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 7,
        title: "Gestion des contacts",
        description: "",
        objectif: "Apprenez à gérer vos contacts",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
      {
        id: 8,
        title: "Lexicologie Android",
        description: "",
        objectif:
          "Voici quelques mots que vous allez rencontrer sur votre téléphone",
        content: [],
        hashtag: [],
        difficulty: "",
        author: "",
      },
    ],
  },
  {
    id: 3,
    theme: "Aller sur ",
    icon: "/image/internet.gif",
  },
  {
    id: 4,
    theme: "Vie Courante",
    icon: "/image/telephone.png",
  },
  {
    id: 5,
    theme: "Me divertir",
    icon: "/image/telephone.png",
  },
  {
    id: 6,
    theme: "Mes mails",
    icon: "/image/mail2.gif",
  },
  {
    id: 7,
    theme: "Communiquer",
    icon: "/image/telephone.png",
  },
  {
    id: 8,
    theme: "Utiliser mon téléphone en sécurité",
    icon: "/image/securite.gif",
  },
  {
    id: 9,
    theme: "Se déplacer",
    icon: "/image/deplacer.gif",
  },
  {
    id: 10,
    theme: "Se faire aider",
    icon: "/image/aide.gif",
  },
];

export default function TutorialByTheme() {
  const [data, setData] = useState();
  const { id } = useParams();
  const { userInfos } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/tutorials/?theme=${id}`)
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
        xl:grid-cols-2
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
                  {tutorial.difficulty_name}
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
