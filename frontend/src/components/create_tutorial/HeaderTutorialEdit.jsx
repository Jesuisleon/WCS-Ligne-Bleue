import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

function SelectInput({ type, name, optionValues, handleInput }) {
  return (
    <div className="flex flex-col gap-2 items-start ">
      <h2 className="text-2xl font-bold">{name}</h2>
      <select onChange={handleInput} name={type} id={type}>
        <option value="">Veuillez Selectionner</option>
        {optionValues.map((option, index) => (
          <option key={option} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextInput({ type, name, placeholder, defaultValue, handleInput }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={type} className="text-2xl font-bold">
        {name}
      </label>
      <input
        onChange={handleInput}
        placeholder={placeholder}
        name={type}
        id={type}
        type="text"
        defaultValue={defaultValue}
      />
    </div>
  );
}

function HashtagInput({ handleInput, defaultValue }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-2xl font-bold">Hashtag</h2>
      <input
        onChange={handleInput}
        placeholder="Vos hashtag"
        name="hashtag"
        id="hashtag"
        type="textarea"
        defaultValue={defaultValue}
      />
    </div>
  );
}

const HeaderTutorialEdit = forwardRef(({ handleImageEditor, getData }, ref) => {
  const [data, setData] = useState(null);

  const themesName = [
    "Utiliser ligne Bleue",
    "Utiliser mon téléphone",
    "Aller sur internet",
  ];

  useEffect(() => {
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
          optionValues={themesName}
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
          handleInput={(e) => handleInput(e.target.value, { id: "hashtag" })}
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
