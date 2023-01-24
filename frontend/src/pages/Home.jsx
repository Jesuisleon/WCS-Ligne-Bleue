import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { NavigationContext } from "@context/NavigationContext";

import axios from "axios";

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
    },
    {
      id: 2,
      name: "Pour poursuivre",
      src: "/image/poursuivre.gif",
    },
  ];

  const iconsContainerStyled =
    "h-[5em] w-[5em] sm:h-fit sm:w-fit bg-yellow-400 rounded-full p-3 m-2 border-2 sm:border-4 border-white";

  const iconStyled = "w-full h-full sm:h-[4em] lg:h-20 p-1 sm:p-4";

  const themeCard =
    "px-10 bg-white text-blue-700 text-l sm:text-xl antialiased font-bold 2xl:font-bold flex flex-col items-center justify-center text-center h-30 w-30 rounded-lg shadow-lg shadow-yellow-400 border-2 border-yellow-400 border-opacity-50 hover:border-transparent";

  const themeCardFx =
    "hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:border-transparent";

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
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-6
        auto-rows-[minmax(140px,_0.3fr)]
        sm:auto-rows-[minmax(180px,_2fr)]
        lg:auto-rows-[minmax(220px,_2fr)]
        "
      >
        {themes.map((data) => (
          <Link
            key={data.id}
            className={themeCardStyled}
            to={`/theme/${data.id}`}
          >
            <motion.div key={data.id} className={iconsContainerStyled}>
              <img src={data.icon} alt={data.name} className={iconStyled} />
            </motion.div>
            <p>{data.name}</p>
          </Link>
        ))}

        {otherThemes.map((data) => (
          <Link
            key={data.id}
            className={themeCardStyled}
            to={`/theme/${data.id}`}
          >
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
