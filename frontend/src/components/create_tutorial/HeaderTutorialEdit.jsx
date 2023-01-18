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

const HeaderTutorialEdit = forwardRef(
  ({ handleImageEditor, getData, preview }, ref) => {
    const [data, setData] = useState(null);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
      // get themes from database
      axios.get(`${VITE_BACKEND_URL}/home`).then((response) => {
        setThemes(response.data.map((e) => e.name));
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
              name="Théme"
              optionValues={themes}
              handleInput={(e) => handleInput(e.target.value, { id: "theme" })}
              invalid={invalid.theme}
              isSubmit={isSubmit}
            />
            <SelectInput
              type="difficulty"
              name="Niveau"
              optionValues={["Débutant", "Facile", "Novice"]}
              handleInput={(e) =>
                handleInput(e.target.value, { id: "difficulty" })
              }
              invalid={invalid.difficulty}
              isSubmit={isSubmit}
            />
            <HashtagInput
              defaultValue=""
              handleInput={(e) => handleInput(e, { id: "hashtag" })}
            />
          </div>
        )}
        <div className="tutorial-header">
          <div className="tutorial-h-1">
            <img src="https://via.placeholder.com/150" alt="logo" />
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

export default HeaderTutorialEdit;
