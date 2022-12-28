import { Link } from "react-router-dom";
import { themeTutorialData } from "../data";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  let icon = <img
  src="/image/logo.png"
  alt="tutorial"
  className="h-14"
  />;

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 500;
  
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  
  if (width < breakpoint) {
    icon = null;
  }

  
  const buttonStyle = "px-10 bg-white text-blue-700 text-l lg:text-xl antialiased font-bold flex flex-col items-center justify-center text-center h-30 w-30 rounded-xl hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:border-transparent shadow-lg shadow-yellow-400"

  return (
    <motion.div
    initial={{ x: window.innerWidth }}
      animate={{ x: 0 }}
      // exit={ {x: "-100%"} }
      transition={{ duration: 0.5 }}
      className="flex-grow flex flex-col items-center justify-center"
    >
      <div
        className="
        my-10
        mx-10
        sm:mx-20
        grid
        grid-cols-2
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-5
        gap-6
        auto-rows-[minmax(100px,_1fr)]
        sm:auto-rows-[minmax(180px,_2fr)]
        lg:auto-rows-[minmax(220px,_2fr)]
        ">
        {themeTutorialData.map((data) => (
          <Link
            key={data.theme}
            className={buttonStyle}
            to={`/${data.theme}`}
          >
            {icon}
            {data.theme}
          </Link>
        ))}
          <Link
            className={buttonStyle}
            to="/search"
        >
          {icon}
            Rechercher un tutoriel
          </Link>
          <Link
            className={buttonStyle}
            to="/tofollow"
        >
          {icon}
            Pour poursuivre
          </Link>
      </div>
    </motion.div>
  );
}

