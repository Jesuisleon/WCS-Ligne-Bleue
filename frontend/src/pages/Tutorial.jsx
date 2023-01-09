import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TutorialTheme() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const { id } = useParams();

  const [dataFromAxios, setDataFromAxios] = useState();

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/tutorials/${id}`)
      .then((response) => {
        const content = JSON.parse(response.data.content);
        response.data.content = content;
        setDataFromAxios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createMarkup = (content) => {
    return { __html: content };
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-start mx-2" />
      <div>
        {dataFromAxios &&
          dataFromAxios.content.map((tutorial) => (
            <div key={tutorial.id}>
              <div dangerouslySetInnerHTML={createMarkup(tutorial.content)} />
            </div>
          ))}
      </div>
    </div>
  );
}
