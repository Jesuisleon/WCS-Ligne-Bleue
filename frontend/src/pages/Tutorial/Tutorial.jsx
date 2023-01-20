import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "@components/Quiz";
import Rating from "./Rating";
import Comments from "./Comments";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Tutorial() {
  const { id } = useParams();
  const [theme, setTheme] = useState([]);

  const [data, setData] = useState();
  useEffect(() => {
    if (data) {
      document.title = data.title;
    }
  }, [data]);

  const getThemeIcon = () => {
    axios.get(`${VITE_BACKEND_URL}/home`).then((response) => {
      const selectedTheme = response.data.filter(
        (res) => res.id === data.theme_id
      );
      setTheme(selectedTheme);
    });
  };

  useEffect(() => {
    if (data) getThemeIcon();
  }, [data]);

  const getTutorialContent = () => {
    axios
      .get(`${VITE_BACKEND_URL}/tutorials/${id}`)
      .then((response) => {
        const step = JSON.parse(response.data.step);
        const updateSrcImage = step
          .filter(({ type }) => type === "image")
          .map((image) => {
            const regex = /src="([^"])*"/;
            const src = regex.exec(image.content)[0].split('"')[1];
            const newSrc = `${VITE_BACKEND_URL}${src}`;
            const updatedContent = image.content.replace(src, newSrc);
            return { ...image, content: updatedContent };
          });
        response.data.step = updateSrcImage;

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
      <div className="flex flex-col justify-center items-start mx-2" />
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
      {data.step.map((step) => {
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
      <Rating />
      <Comments />
    </div>
  );
}
