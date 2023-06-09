import * as ReactRouter from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { NavigationContext } from "@context/NavigationContext";
import { AuthContext } from "@context/AuthContext";

import { motion } from "framer-motion";

import Loading from "@components/Loading";
import NotFoundTheme from "@components/NotFoundThemes";

import TutorialCard from "@components/TutorialCard";

const { useParams } = ReactRouter;

export default function Theme() {
  const { themeId } = useParams();

  const { setNavigationTitle } = useContext(NavigationContext);
  const { userInfos, userJourney } = useContext(AuthContext);

  const [dataWithJourney, setDataWithJourney] = useState(undefined);

  const [data, setData] = useState();

  // GET TUTORIALS FROM DATABASE WITH USER ID JOURNEY
  useEffect(() => {
    if (userJourney.length > 1 && data) {
      const themeJourney = userJourney
        .filter((r) => r.theme_id.toString() === themeId)
        .filter((r) => r.user_id);
      const userData = data.map((tutorial) => {
        if (themeJourney.find((j) => j.id === tutorial.id)) {
          return {
            ...tutorial,
            user_id: userInfos.userId,
            creation_date: themeJourney.filter((j) => j.id === tutorial.id)[0]
              .creation_date,
          };
        }
        return {
          ...tutorial,
          user_id: null,
          creation_date: null,
        };
      });
      setDataWithJourney(userData);
    } else {
      setDataWithJourney(data);
    }
  }, [data]);

  // GET TUTORIALS FROM DATABASE WITH THEME ID
  const fetchTutorials = () => {
    axios
      .get(`/tutorials/?theme=${themeId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTutorials();
    setNavigationTitle("Theme");
  }, []);

  if (dataWithJourney === undefined) return <Loading />;

  if (dataWithJourney.length === 0) return <NotFoundTheme />;
  return (
    <div className="my-2 mx-4 sm:mx-10 xl:mx-14 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-2 ">
      {dataWithJourney.map((tutorial) =>
        tutorial.published ? (
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
            <TutorialCard
              title={tutorial.title}
              difficulties={tutorial.difficulty_name}
              objective={tutorial.objective}
              themeId={themeId}
              tutorialId={tutorial.id}
              validate={tutorial.user_id}
              date={tutorial.creation_date}
            />
          </motion.div>
        ) : null
      )}
    </div>
  );
}
