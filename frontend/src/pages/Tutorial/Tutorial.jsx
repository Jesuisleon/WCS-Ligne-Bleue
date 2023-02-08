import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { NavigationContext } from "@context/NavigationContext";

import axios from "axios";
import { AuthContext } from "@context/AuthContext";

import NotFound404 from "@components/NotFound404";
import Loading from "@components/Loading";

import Quiz from "@components/Quiz";

import NotificationSimple from "@components/notifications/NotificationSimple";
import Rating from "./Rating";
import Comments from "./Comments";

export default function Tutorial() {
  const { userInfos, setUserJourney, userJourney } = useContext(AuthContext);

  const { setNavigationTitle } = useContext(NavigationContext);

  const { tutorialId } = useParams();

  const [data, setData] = useState(null);

  const [newData, setNewData] = useState({ rating: null, comments: null });

  const [validate, setValidate] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (data) {
      setNavigationTitle(data.title);
    }
    if (userJourney.length > 1) {
      if (
        userJourney.filter((j) => j.id.toString() === tutorialId)[0].user_id !==
        null
      ) {
        setValidate(true);
      }
    }
  }, [data]);

  const updateJourneyContext = () => {
    const newJourney = userJourney.map((j) => {
      if (j.id.toString() === tutorialId) {
        return {
          ...j,
          user_id: userInfos.userId,
          creation_date: new Date(),
        };
      }
      return j;
    });
    setUserJourney(newJourney);
  };

  const postJourney = (tutoId, userId, rating, comment) => {
    axios
      .post(`/journey`, { tutorialId: tutoId, userId, rating, comment })
      .then(() => {
        setValidate(true);
        setOpenNotification(true);
        updateJourneyContext();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTutorialContent = () => {
    axios
      .get(`/tutorials/${tutorialId}`)
      .then((response) => {
        response.data.step = JSON.parse(response.data.step);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTutorialContent();
  }, []);

  const createMarkup = (content) => {
    return { __html: content };
  };

  if (data === null) return <Loading />;

  if (data !== null && userInfos.isAdmin === 0 && data.published === 0) {
    return <NotFound404 />;
  }

  return (
    <div className="flex flex-col gap-14 mb-10 px-4 md:px-20 text-lg text-gray-800 divide-gray-200 ">
      {/* NOTIFICATIONS */}
      <NotificationSimple
        title="Bravo"
        message="Vous avez validé ce tutoriel !"
        show={openNotification}
        setShow={setOpenNotification}
      />
      {/* HEADER */}

      <div className="flex flex-col gap-6 pt-10">
        <div className="flex flex-col gap-6 sm:gap-14">
          <div className="flex flex-col items-start sm:gap-2">
            <h1 className="text-4xl font-semibold first-letter:capitalize text-blue-700 ">{data.title}</h1>
          </div>

          <div className="flex flex-col items-start sm:gap-2">
            <h1 className="text-2xl font-semibold">Objectif</h1>
            <p className="first-letter:capitalize">{data.objective}</p>
          </div>
        </div>

        <div className="flex flex-col sm:gap-2">
          <h2 className="text-2xl font-semibold">Description</h2>
          <div
            className="first-letter:capitalize"
            dangerouslySetInnerHTML={createMarkup(data.description)}
          />
        </div>
      </div>

      {/* STEPPERS */}
      <div>
        <h1 className="text-3xl font-semibold sm:mb-2 text-blue-700">Tutoriel</h1>
        <div className="flex flex-col items-center gap-6">
          {data.step.map((step) => {
            if (step.type === "quiz") {
              return (
                <div key={step.id} className="w-full">
                  <Quiz key={step.id} data={step.content} />
                </div>
              );
            }
            return (
              <div key={step.id} className="">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={createMarkup(step.content)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* VALIDATOR */}

      {userInfos.userId && (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-blue-700 mx-auto">Votre avis</h2>
          <div className="bg-gray-50 border-2 shadow-lg w-full xl:w-1/2 rounded text-gray-800 flex flex-col justify-center items-center gap-8 py-6 mt-4 mx-auto">
            {validate === false && (
              <>
                <Rating validate={validate} setData={setNewData} data={newData} />
                <Comments
                  validate={validate}
                  setData={setNewData}
                  data={newData}
                />
              </>
            )}
            {validate === false ? (
              <button
                className="bg-blue-500 text-white py-2 rounded-lg px-5"
                type="submit"
                onClick={() => {
                  postJourney(
                    tutorialId,
                    userInfos.userId,
                    newData.rating,
                    newData.comments
                  );
                }}
              >
                "Ok, c'est compris !"
              </button>
            ) : (
              <p className="text-xl font-bold">Vous avez validé ce tutoriel !</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
