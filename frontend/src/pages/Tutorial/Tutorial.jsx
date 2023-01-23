import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import axios from "axios";

import Quiz from "@components/Quiz";

import Rating from "./Rating";
import Comments from "./Comments";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Tutorial() {
  const { id } = useParams();
  const [theme, setTheme] = useState([]);
  const { userInfos } = useContext(AuthContext);

  const [newData, setNewData] = useState({ rating: null, comments: null });

  const [validate, setValidata] = useState(false);

  const postJourney = (tutorialId, userId, rating, comment) => {
    axios
      .post(`/journey`, { tutorialId, userId, rating, comment })
      .then(() => {
        alert("Vous avez validé ce tutoriel !");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (validate)
      postJourney(id, userInfos.userId, newData.rating, newData.comments);
  }, [validate]);

  const [data, setData] = useState(null);

  const getThemeIcon = () => {
    axios.get(`/home`).then((response) => {
      const selectedTheme = response.data.filter(
        (res) => res.id === data.theme_id
      );
      setTheme(selectedTheme);
    });
  };

  useEffect(() => {
    if (data) {
      document.title = data.title;
      getThemeIcon();
    }
  }, [data]);

  const getTutorialContent = () => {
    axios
      .get(`/tutorials/${id}`)
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

  if (data === undefined) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col justify-center items-center mx-2" />
      <div className="tutorial-header">
        {theme.length !== 0 && (
          <img className="h-20 ml-10" src={theme[0].icon} alt={theme[0].name} />
        )}
        <div className="tutorial-h-2">
          <h1 className="h1-font">{data && data.title}</h1>
          <h2 className="h2-font">{data && data.objective}</h2>
        </div>
        <div className="tutorial-h-description">
          <h2 className="h2-font">Description</h2>
          {data && (
            <div dangerouslySetInnerHTML={createMarkup(data.description)} />
          )}
        </div>
      </div>
      {data !== null &&
        data.step.map((step) => {
          if (step.type === "quiz") {
            return (
              <div key={step.id} className="tutorial-step">
                <Quiz key={step.id} data={step.content} />
              </div>
            );
          }
          return (
            <div key={step.id} className="tutorial-step">
              <div
                className="flex justify-center"
                dangerouslySetInnerHTML={createMarkup(step.content)}
              />
            </div>
          );
        })}
      {userInfos.userId && (
        <div className=" bg-blue-900 bg-gradient-to-br from-blue-400 rounded-xl w-1/2 text-white flex flex-col justify-center items-center gap-4 py-4 mx-auto mt-4">
          {validate === false && <h2 className="h2-font">Donnez votre avis</h2>}
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
