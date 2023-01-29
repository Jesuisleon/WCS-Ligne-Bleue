import * as ReactRouter from "react-router-dom";
const {  useParams } = ReactRouter;
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { NavigationContext } from "@context/NavigationContext";
import { AuthContext } from "@context/AuthContext";

import { motion } from "framer-motion";

import TutorialCard from "@components/TutorialCard";


export default function TutorialByTheme() {
  const { themeId } = useParams();

  const { setNavigationTitle } = useContext(NavigationContext);
  const { userInfos } = useContext(AuthContext);


  const [data, setData] = useState();
  console.log("🚀 ~ file: TutorialsByTheme.jsx:23 ~ TutorialByTheme ~ data", data)



  // CHECK IF USER HAVE ALREADY VALIDATED TUTORIAL
  const fetchValidation = (tutorialId, response) => {
    const validation = response.filter(({ user_id }) => user_id).length > 0;
    if (validation) {
      return userInfos.userId
    }
    return false;
  };

    


  // GET TUTORIALS FROM DATABASE WITH USER ID JOURNEY
  useEffect(() => {
    if (userInfos.userId && data) {
      axios.get(`/journeys-validation/${userInfos.userId}`).then((res) => {
        const userData = data.map((tutorial) => {
          return {
            ...tutorial,
            user_id: fetchValidation(tutorial.id, res.data),
          };
        });
        setData(userData);
      });
    }
  }, [userInfos]);

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

  return (
    <div
      className="my-2 mx-4 sm:mx-10 xl:mx-14 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-2 auto-rows-[minmax(100px,_1fr)] lg:auto-rows-[minmax(180px,_2fr)] xl:auto-rows-[minmax(220px,_2fr)]">
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
            <TutorialCard
                    title={tutorial.title}
                    objective={tutorial.objective}
                    date={tutorial.creation_date}
                    difficulties={tutorial.difficulty_name}
                    themeId={themeId}
                    tutorialId={tutorial.id}
                    validate={tutorial.user_id} />

          </motion.div>
        ))}
    </div>
  );
}
