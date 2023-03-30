import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { NavigationContext } from "@context/NavigationContext";

import { motion } from "framer-motion";

import Loading from "@components/Loading";

export default function Home() {
  const { setNavigationTitle } = useContext(NavigationContext);

  const [themes, setThemes] = useState([]);

  useEffect(() => {
    axios.get(`/home`).then((response) => {
      setThemes(response.data);
    });
    setNavigationTitle("Bienvenue");
  }, []);

  const otherThemes = [
    {
      id: 1,
      name: "Rechercher un tutoriel",
      src: "/image/search.gif",
      link: "/search",
    },
    {
      id: 2,
      name: "Pour poursuivre",
      src: "/image/poursuivre.gif",
      link: "#",
    },
  ];

  const iconsContainerStyled =
    "hidden xs:block h-[5em] w-[5em] sm:h-fit sm:w-fit bg-yellow-400 rounded-full p-3 m-2 ";

  const iconStyled = "w-full h-full sm:h-[4em] lg:h-20 p-1 sm:p-3";

  const themeCard =
    "px-10 py-4 bg-gradient-to-b from-blue-700 to-blue-900 text-white border-opacity-25 text-l sm:text-xl antialiased font-bold 2xl:font-bold flex flex-col items-center justify-center text-center h-30 w-30 rounded-md shadow-md ";

  const themeCardFx =
    "hover:bg-yellow-400 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110";

  const themeCardStyled = `${themeCard} ${themeCardFx}`;

  return (
    <motion.div
      key="home"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.5 }}
      className="flex-grow flex flex-col items-center justify-center"
    >
      <div
        className="
        my-10
        mx-10
        sm:mx-20
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-5
        gap-6
        auto-rows-[minmax(140px,_0.3fr)]
        sm:auto-rows-[minmax(180px,_2fr)]
        lg:auto-rows-[minmax(220px,_2fr)]
        "
      >
        {themes.length === 0 && <Loading />}
        {themes.map((data) => (
          <Link
            key={data.id}
            className={themeCardStyled}
            to={`/theme/${data.id}`}
          >
            <motion.div
              data-id={data.id}
              key={data.id}
              className={iconsContainerStyled}
            >
              <img
                src={`../public/${data.icon}`}
                alt={data.name}
                className={iconStyled}
              />
            </motion.div>
            <p>{data.name}</p>
          </Link>
        ))}

        {themes.length > 0 &&
          otherThemes.map((data) => (
            <Link key={data.id} className={themeCardStyled} to={data.link}>
              <motion.div key={data.id} className={iconsContainerStyled}>
                <img src={data.src} alt={data.name} className={iconStyled} />
              </motion.div>
              <p>{data.name}</p>
            </Link>
          ))}
      </div>
    </motion.div>
  );
}
