import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import axios from "axios";
import { SelectInput } from "./inputs/SelectInput";
import { TextInput } from "./inputs/TextInput";
import { HashtagInput } from "./inputs/HashtagInput";
import { EditorInput } from "./inputs/EditorInput";

const { VITE_BACKEND_URL } = import.meta.env;
const { VITE_FRONTEND_URL } = import.meta.env;

const HeaderMaker = forwardRef(
  ({ handleImageEditor, getData, preview }, ref) => {
    const [themes, setThemes] = useState([]);
    const [themeIcon, setThemeIcon] = useState("");
    const [difficulties, setDifficulties] = useState([]);

    const [data, setData] = useState({});

    useEffect(() => {
      if (data.theme) {
        const theme = themes.find((e) => e.id.toString() === data.theme);
        setThemeIcon(theme.icon);
      }
    }, [data]);

    useEffect(() => {
      // get themes from database
      axios.get(`${VITE_BACKEND_URL}/home`).then((response) => {
        axios.get(`${VITE_BACKEND_URL}/difficulties`).then((response2) => {
          setDifficulties(response2.data);
          setThemes(response.data);
        });
      });
      // get datas if already exists
      if (getData) {
        setData(getData);
      }
    }, []);

    const [invalid, setInvalid] = useState({
      theme: true,
      difficulty: true,
      title: true,
      objective: true,
      description: true,
    });
    const [isSubmit, setIsSubmit] = useState(false);

    const childRef = useRef(null);
    useImperativeHandle(ref, () => ({
      getData: () => {
        setIsSubmit(true);
        if (Object.values(invalid).every((e) => e === false)) {
          return data;
        }
        return false;
      },
    }));

    function handleInput(content, editor) {
      // init isSubmit when user start to write
      setIsSubmit(false);
      // store the data
      setData({ ...data, [editor.id]: content });
      // check if input is valid
      if (content === "" || content === null)
        setInvalid({ ...invalid, [editor.id]: true });
      else setInvalid({ ...invalid, [editor.id]: false });
    }

    const createMarkup = (content) => {
      return { __html: content };
    };

    return (
      <div ref={childRef} className="col">
        {preview === false && (
          <div className="flex-col sm:flex-row flex items-center justify-around gap-4 mb-4 bg-white w-full  p-6">
            <SelectInput
              type="theme"
              name="Theme"
              defaultValue={data ? data.theme : ""}
              optionValues={themes.map((e) => e.name)}
              handleInput={(e) => handleInput(e.target.value, { id: "theme" })}
              invalid={invalid.theme}
              isSubmit={isSubmit}
            />
            <SelectInput
              type="difficulty"
              name="Niveau"
              defaultValue={data ? data.difficulty : ""}
              // optionValues={["Débutant", "Facile", "Novice"]}
              optionValues={difficulties.map(
                (object) => Object.values(object)[0]
              )}
              handleInput={(e) =>
                handleInput(e.target.value, { id: "difficulty" })
              }
              invalid={invalid.difficulty}
              isSubmit={isSubmit}
            />
            <HashtagInput
              defaultValue={data ? data.hashtag : ""}
              handleInput={(e) => handleInput(e, { id: "hashtag" })}
            />
          </div>
        )}
        <div className="tutorial-header">
          <div className="tutorial-h-1">
            {themeIcon && (
              <img src={`${VITE_FRONTEND_URL}${themeIcon}`} alt="logo" />
            )}
          </div>
          <div className="tutorial-h-2">
            <TextInput
              type="title"
              name="Titre"
              placeholder="Votre titre"
              defaultValue={data ? data.title : ""}
              handleInput={(e) => handleInput(e.target.value, { id: "title" })}
              invalid={invalid.title}
              isSubmit={isSubmit}
            />
            <TextInput
              type="objective"
              name="Objectif"
              placeholder="Votre objectif"
              defaultValue={data ? data.objective : ""}
              handleInput={(e) =>
                handleInput(e.target.value, { id: "objective" })
              }
              invalid={invalid.objective}
              isSubmit={isSubmit}
            />
          </div>

          {preview ? (
            <div dangerouslySetInnerHTML={createMarkup(data.description)} />
          ) : (
            <EditorInput
              handleImageEditor={handleImageEditor}
              handleInput={(e) => handleInput(e, { id: "description" })}
              data={data ? data.description : ""}
              invalid={invalid.description}
              isSubmit={isSubmit}
            />
          )}
        </div>
      </div>
    );
  }
);

export default HeaderMaker;
