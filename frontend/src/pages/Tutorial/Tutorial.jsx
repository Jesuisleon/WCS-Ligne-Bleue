import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { NavigationContext } from "@context/NavigationContext";

import axios from "axios";
import { AuthContext } from "@context/AuthContext";

import Quiz from "@components/Quiz";

import Rating from "./Rating";
import Comments from "./Comments";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Tutorial() {
  const { userInfos } = useContext(AuthContext);
  const { setNavigationTitle } = useContext(NavigationContext);

  const { tutorialId } = useParams();

  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      document.title = data.title;
      setNavigationTitle(data.title);
    }
  }, [data]);

  const [newData, setNewData] = useState({ rating: null, comments: null });

  const [validate, setValidata] = useState(false);

  const postJourney = (tutoId, userId, rating, comment) => {
    axios
      .post(`/journey`, { tutorialId: tutoId, userId, rating, comment })
      .then(() => {
        alert("Vous avez validé ce tutoriel !");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (validate)
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

        const updateSrcImage = response.data.step
          .filter(({ type }) => type === "image")
          .map((image) => {
            const regex = /src="([^"])*"/;
            const src = regex.exec(image.content)[0].split('"')[1];
            const newSrc = `${VITE_BACKEND_URL}${src}`;
            const updatedContent = image.content.replace(src, newSrc);
            return { ...image, content: updatedContent };
          });

        response.data.step = [
          ...response.data.step.filter(({ type }) => type !== "image"),
          ...updateSrcImage,
        ];

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

  if (data === null) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10 mb-10 px-4 md:px-20">
      {/* HEADER */}
      <div className="flex flex-col gap-6 p-10 border-x-4 border-b-4 border-dashed border-blue-700">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-xl text-blue-700 font-semibold">Objectif</h1>
            <p className="text-blue-500 first-letter:capitalize">
              {data.objective}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-blue-700 font-semibold">Description</h2>
          <div
            className="text-blue-500 first-letter:capitalize"
            dangerouslySetInnerHTML={createMarkup(data.description)}
          />
        </div>
      </div>

      {/* STEPPERS */}
      {data.step.map((step) => {
        if (step.type === "quiz") {
          return (
            <div key={step.id} className="rounded-xl my-4 py-2">
              <Quiz key={step.id} data={step.content} />
            </div>
          );
        }
        return (
          <div key={step.id} className="rounded-xl my-4 py-2">
            <div
              className="flex justify-center"
              dangerouslySetInnerHTML={createMarkup(step.content)}
            />
          </div>
        );
      })}

      {/* VALIDATOR */}
      {userInfos.userId && (
        <div className="bg-gradient-to-b from-blue-600 to-blue-900 w-full xl:w-1/2 rounded-md text-white flex flex-col justify-center items-center gap-6 py-4 mx-auto mt-4">
          {validate === false && <h2 className="h1-font">L'envie d'avis</h2>}
          <Rating validate={validate} setData={setNewData} data={newData} />
          <Comments validate={validate} setData={setNewData} data={newData} />
          <button
            className="bg-blue-500 text-white py-2 rounded-lg px-5"
            type="submit"
            onClick={() => {
              setValidata(true);
            }}
          >
            Ok, c'est compris !
          </button>
        </div>
      )}
    </div>
  );
}
