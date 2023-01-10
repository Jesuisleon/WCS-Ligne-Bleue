import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { HashtagInput } from "./inputs/HashtagInput";
import { SelectInput } from "./inputs/SelectInput";
import { TextInput } from "./inputs/TextInput";

const { VITE_BACKEND_URL } = import.meta.env;

const HeaderTutorialEdit = forwardRef(({ handleImageEditor, getData }, ref) => {
  const [data, setData] = useState(null);

  const [themes, setThemes] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_BACKEND_URL}/home`).then((response) => {
      setThemes(response.data.map((e) => e.themeName));
    });
    if (getData) {
      setData(getData);
    }
  }, []);

  const childRef = useRef(null);
  useImperativeHandle(ref, () => ({
    getData: () => {
      return data;
    },
  }));

  function handleInput(content, editor) {
    setData({ ...data, [editor.id]: content });
  }

  return (
    <div ref={childRef} className="col">
      <div className="flex-col sm:flex-row flex items-center justify-around gap-4 mb-4 bg-white w-full  p-6">
        <SelectInput
          type="theme"
          name="Théme"
          optionValues={themes}
          handleInput={(e) => handleInput(e.target.value, { id: "theme" })}
        />
        <SelectInput
          type="difficulty"
          name="Niveau"
          optionValues={["Débutant", "Facile", "Novice"]}
          handleInput={(e) => handleInput(e.target.value, { id: "difficulty" })}
        />
        <HashtagInput
          defaultValue=""
          handleInput={(e) => handleInput(e, { id: "hashtag" })}
        />
      </div>
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
          />
          <TextInput
            type="objective"
            name="Objectif"
            placeholder="Votre objectif"
            defaultValue={data ? data.objective : ""}
            handleInput={(e) =>
              handleInput(e.target.value, { id: "objective" })
            }
          />
        </div>
        <div className="tutorial-h-description">
          <h2 className="text-2xl font-bold">Description</h2>
          <Editor
            apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
            id="description"
            onEditorChange={(e) => handleInput(e, { id: "description" })}
            value={data ? data.description : ""}
            init={{
              selector: "#theEditorForTopData",
              autoresize_bottom_margin: 0,
              statusbar: false,
              placeholder: "Votre description",
              toolbar_sticky: true,
              menubar: false,
              editimage_cors_hosts: ["picsum.photos"],
              content_style:
                "body { font-family: Montserrat, Arial, sans-serif }",
              plugins: "autoresize image",
              toolbar: "bold italic underline image ",
              images_upload_handler: handleImageEditor,
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default HeaderTutorialEdit;
