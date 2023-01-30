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

  const { tutorialId, themeId } = useParams();

  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      setNavigationTitle(data.title);
    }
  }, [data]);

  const [newData, setNewData] = useState({ rating: null, comments: null });

  const [validate, setValidate] = useState(false);
  useEffect(() => {}, []);
  const [openNotification, setOpenNotification] = useState(false);

  const postJourney = (tutoId, userId, rating, comment) => {
    axios
      .post(`/journey`, { tutorialId: tutoId, userId, rating, comment })
      .then(() => {
        setOpenNotification(true);
        setUserJourney([
          ...userJourney,
          {
            id: parseInt(tutoId, 10),
            theme_id: parseInt(themeId, 10),
            user_id: userId,
            creation_date: new Date(),
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userJourney.length > 1 && data)
      if (userJourney.find((j) => j.id === parseInt(tutorialId, 10)))
        setValidate(true);
  }, [userJourney]);

  useEffect(() => {
    if (
      validate &&
      userJourney.find((j) => j.id === parseInt(tutorialId, 10)) === false
    )
      postJourney(
        tutorialId,
        userInfos.userId,
        newData.rating,
        newData.comments
      );
  }, [validate]);

  const getTutorialContent = () => {
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
    getTutorialContent();
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
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-14">
          <div className="flex flex-col items-start sm:gap-2">
            <h1 className="text-4xl font-semibold">Titre</h1>
            <p className=" first-letter:capitalize">{data.title}</p>
          </div>

          <div className="flex flex-col items-start sm:gap-2">
            <h1 className="text-4xl font-semibold">Objectif</h1>
            <p className="first-letter:capitalize">{data.objective}</p>
          </div>
        </div>

        <div className="flex flex-col sm:gap-2">
          <h2 className="text-4xl font-semibold">Description</h2>
          <div
            className="first-letter:capitalize"
            dangerouslySetInnerHTML={createMarkup(data.description)}
          />
        </div>
      </div>

      {/* STEPPERS */}
      <div>
        <h1 className="text-4xl font-semibold sm:mb-2">Tutoriel</h1>
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
        <div className="bg-gray-50 border-2 shadow-lg w-full xl:w-1/2 rounded text-gray-800 flex flex-col justify-center items-center gap-8 py-6 mx-auto mt-4">
          {validate === false && (
            <h2 className="text-4xl font-semibold">Votre avis</h2>
          )}
          <Rating validate={validate} setData={setNewData} data={newData} />
          <Comments validate={validate} setData={setNewData} data={newData} />
          {validate ? (
            <p className="text-xl font-bold">Vous avez validé ce tutoriel !</p>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 rounded-lg px-5"
              type="submit"
              onClick={() => {
                setValidate(true);
              }}
            >
              "Ok, c'est compris !"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
