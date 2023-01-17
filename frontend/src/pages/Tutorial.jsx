import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "@components/tutorial/Quiz";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Tutorial() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/tutorials/${id}`)
      .then((response) => {
        const step = JSON.parse(response.data.step);
        response.data.step = step;
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createMarkup = (content) => {
    return { __html: content };
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start mx-2" />
      <div className="tutorial-header">
        <div className="tutorial-h-1">
          <img src="https://via.placeholder.com/150" alt="logo" />
        </div>
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

      <div>
        {data &&
          data.step.map((step) => (
            <div key={step.id} className="tutorial-step">
              {step.type === "editor" ? (
                <div key={step.id}>
                  <div dangerouslySetInnerHTML={createMarkup(step.content)} />
                </div>
              ) : (
                <Quiz key={step.id} data={step.content} />
              )}
            </div>
          ))}
      </div>
    </>
  );
}
