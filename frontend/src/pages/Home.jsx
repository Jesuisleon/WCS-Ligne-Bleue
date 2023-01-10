import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/home`)
      .then((response) => response.json())
      .then((data) => {
        setThemes(data);
      });
  }, []);

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

  const icon3 = (
    <img
      src="/image/search.gif"
      alt="tutorial"
      className="w-full h-full sm:h-[4em] lg:h-20 "
    />
  );
  const icon4 = (
    <img
      src="/image/poursuivre.gif"
      alt="tutorial"
      className="w-full h-full sm:h-[4em] lg:h-20 "
    />
  );

  const buttonStyle =
    "px-10 bg-white text-blue-700 text-l sm:text-xl antialiased font-semibold 2xl:font-bold flex flex-col items-center justify-center text-center h-30 w-30 rounded-xl hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:border-transparent shadow-lg shadow-yellow-400";

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
        grid-cols-2
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-6
        auto-rows-[minmax(100px,_1fr)]
        sm:auto-rows-[minmax(180px,_2fr)]
        lg:auto-rows-[minmax(220px,_2fr)]
        "
      >
        {themes.map((data) => (
          <Link key={data.id} className={buttonStyle} to={`/theme/${data.id}`}>
            <motion.div
              key={data.id}
              className="h-[4em] w-[4em] sm:h-fit sm:w-fit bg-amber-300 rounded-full p-3 m-2 border-2 sm:border-4 border-white"
            >
              <img
                src={data.icon}
                alt={data.themeName}
                className="w-full h-full sm:h-[4em] lg:h-20"
              />
            </motion.div>
            <p>{data.themeName}</p>
          </Link>
        ))}

        <Link className={buttonStyle} to="/search">
          <div className=" bg-amber-300 rounded-full p-3 m-2">{icon3}</div>
          <p>Rechercher un tutoriel</p>
        </Link>
        <Link className={buttonStyle} to="/tofollow">
          <div className=" bg-amber-300 rounded-full p-3 m-2">{icon4}</div>
          <p>Pour poursuivre</p>
        </Link>
      </div>
    </motion.div>
  );
}
