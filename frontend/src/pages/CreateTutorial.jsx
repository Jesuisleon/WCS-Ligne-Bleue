import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Quiz from "@components/Quiz";
import axios from "axios";
import stockedData from "./data";

const quizData = [
  {
    id: 1,
    question: "Quelle est la capitale de la France?",
    answers: [
      { id: 1, text: "Londres", correct: false },
      { id: 2, text: "Paris", correct: true },
      { id: 3, text: "Berlin", correct: false },
      { id: 4, text: "New York", correct: false },
    ],
  },
  {
    id: 2,
    question: "Combien y a-t-il de jours dans une année?",
    answers: [
      { id: 1, text: "365", correct: true },
      { id: 2, text: "366", correct: false },
      { id: 3, text: "364", correct: false },
      { id: 4, text: "360", correct: false },
    ],
  },
];

function EditorForTopData({
  handleInputChange,
  id,
  placeholder,
  defaultValue,
}) {
  return (
    <Editor
      apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
      id={id}
      onEditorChange={handleInputChange}
      value={defaultValue}
      init={{
        selector: "#theEditorForTopData",
        fixed_toolbar_container: "#toolbar-container-top",
        placeholder,
        statusbar: false,
        menubar: false,
        inline: true,
        content_style: "body { font-family: Montserrat, Arial, sans-serif }",
        toolbar: "bold italic underline ",
      }}
    />
  );
}

function CreateTutorial() {
  // title objective description difficulty content hashtag, author

  const { VITE_BACKEND_URL } = import.meta.env;

  const author = "Michel";
  const theme = "Utiliser mon téléphone";

  const initialData = [].concat(stockedData);

  const [editorData, setEditorData] = useState([]);

  const [anotherData, setAnotherData] = useState([]);

  useEffect(() => {
    setEditorData(initialData.filter(({ step }) => step));
    setAnotherData(initialData.filter(({ step }) => !step)[0]);
  }, []);

  function SubmitData(e) {
    e.preventDefault();
    const data = {
      title: anotherData.title,
      objective: anotherData.objective,
      description: anotherData.description,
      difficulty: anotherData.difficulty,
      content: editorData,
      hashtag: anotherData.hashtag,
      autor: author,
      theme,
    };
    // console.log(data);
    // stockedData.splice(0, stockedData.length, ...editorData, anotherData);
    axios.post(`${VITE_BACKEND_URL}/tutorials`, data);
  }

  function removeBlockAndUpdateStep(blockToRemove) {
    const newStepArray = editorData.filter(
      (block) => block.step !== blockToRemove
    );
    newStepArray.forEach((block) => {
      if (block.step > blockToRemove) {
        block.step -= 1; // eslint-disable-line no-param-reassign
      }
    });
    setEditorData(newStepArray);
  }

  function addNewBlockAndUpdateStep() {
    const newStep = { step: editorData.length + 1, content: "" };
    const newStepArray = [...editorData, newStep];
    setEditorData(newStepArray);
  }

  function handleInputChange(content, editor) {
    setAnotherData({ ...anotherData, [editor.id]: content });
  }

  const handleEditorChange = (content, editor) => {
    const editorBlockId = parseInt(editor.id.split(":")[1] || 0, 10);
    const updatedEditorContent = editorData.map((block) => {
      if (block.step === editorBlockId) {
        return { ...block, content };
      }
      return block;
    });
    setEditorData(updatedEditorContent);
  };

  return (
    <div className="p-4 h-full w-full">
      <form
        className="w-full h-full flex flex-col items-center"
        action="submit"
        onSubmit={SubmitData}
      >
        <button
          className="absolute z-30 top-[2.9em] sm:top-[6em] right-1 sm:right-4 bg-emerald-600 p-1 sm:p-3 text-white font-light sm:font-normal rounded sm:rounded-xl shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="submit"
        >
          <p>Enregistrer</p>
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Hashtag</h2>
            <input
              onChange={(e) =>
                handleInputChange(e.target.value, { id: "hashtag" })
              }
              placeholder="Vos hashtag"
              id="hashtag"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 items-center ">
            <h2 className="text-2xl font-bold">Niveau</h2>
            <select
              onChange={(e) =>
                handleInputChange(e.target.value, { id: "difficulty" })
              }
              name="level"
              id="level"
            >
              <option value="1">Débutant</option>
              <option value="2">Facile</option>
              <option value="3">Novice</option>
            </select>
          </div>
        </div>
        <div
          id="toolbar-container-top"
          className="h-10 w-full bg-white border-b-2 drop-shadow-sm rounded-t-lg"
        />
        <div className="bg-white p-6 w-full grid justify-center items-center gap-4 grid-cols-4 lg:grid-cols-6 auto-rows-auto lg:grid-rows-1 border-b-2">
          <div className="col-span-1 m-auto">
            <img src="https://via.placeholder.com/150" alt="logo" />
          </div>
          <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Titre</h2>
            <EditorForTopData
              handleInputChange={(e) => handleInputChange(e, { id: "title" })}
              id="title"
              placeholder="Choisissez un titre"
              defaultValue={anotherData ? anotherData.title : ""}
            />
            <h2 className="text-2xl font-bold">Objectif</h2>
            <EditorForTopData
              handleInputChange={(e) =>
                handleInputChange(e, { id: "objective" })
              }
              id="objective"
              placeholder="Décrivez l'objectif de ce tutoriel"
              defaultValue={anotherData ? anotherData.objective : ""}
            />
          </div>
          <div className=" flex flex-col gap-4 col-span-4 lg:col-span-3 lg:row-auto h-full">
            <h2 className="text-2xl font-bold">Description</h2>
            <EditorForTopData
              handleInputChange={(e) =>
                handleInputChange(e, { id: "description" })
              }
              id="description"
              placeholder="Votre description"
              defaultValue={anotherData ? anotherData.description : ""}
            />
          </div>
        </div>
        {editorData.map((block, index) => {
          return (
            <div className="bg-gray-100 w-full relative my-2" key={block.step}>
              <Editor
                key={block.step}
                apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
                value={editorData[index] ? editorData[index].content : ""}
                id={`theEditorArea:${block.step}`}
                onEditorChange={handleEditorChange}
                init={{
                  selector: "#theEditorForMainData",
                  statusbar: false,
                  toolbar_sticky: true,
                  menubar: false,
                  autoresize_bottom_margin: 0,
                  image_advtab: true,
                  noneditable_class: "mceNonEditable",
                  toolbar_mode: "wrap",
                  contextmenu: "link image",
                  content_style:
                    "body { font-family:roboto ,sans-serif; font-size:16px }",
                  plugins:
                    "autoresize preview searchreplace autolink save directionality visualblocks visualchars fullscreen image link media charmap nonbreaking advlist lists wordcount help charmap emoticons",
                  editimage_cors_hosts: ["picsum.photos"],
                  toolbar:
                    "close fullscreen | undo redo removeformat bold italic underline fontsize| forecolor backcolor emoticons insertfile image media link | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist |",
                  setup(editor) {
                    editor.ui.registry.addButton("close", {
                      text: "Fermer",
                      icon: "cancel",
                      onAction() {
                        if (
                          window.confirm(
                            "Êtes-vous sûr de vouloir fermer cet éditeur, Vos données seront perdues ?"
                          )
                        ) {
                          removeBlockAndUpdateStep(editorData[index].step);
                        }
                      },
                    });
                  },
                  images_upload_handler: (blobInfo, progress) => {
                    return new Promise((resolve, reject) => {
                      const xhr = new XMLHttpRequest();
                      xhr.withCredentials = false;
                      xhr.open("POST", `${VITE_BACKEND_URL}/upload/image`);
                      xhr.upload.onprogress = (e) => {
                        progress((e.loaded / e.total) * 100);
                      };
                      xhr.onload = () => {
                        if (xhr.status === 403) {
                          reject(new Error());
                          return;
                        }
                        if (xhr.status < 200 || xhr.status >= 300) {
                          reject(new Error(`HTTP Error: ${xhr.status}`));
                          return;
                        }
                        const json = JSON.parse(xhr.responseText);
                        if (!json || typeof json.location !== "string") {
                          reject(
                            new Error(`Invalid JSON: ${xhr.responseText}`)
                          );
                          return;
                        }
                        resolve(json.location);
                      };
                      xhr.onerror = () => {
                        reject(
                          new Error(
                            `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
                          )
                        );
                      };
                      const formData = new FormData();
                      formData.append(
                        "image",
                        blobInfo.blob(),
                        blobInfo.filename()
                      );
                      xhr.send(formData);
                    });
                  },
                }}
              />
            </div>
          );
        })}

        <button
          type="button"
          className="m-4 p-2 rounded-xl bg-white cursor-pointer text-lg shadow-md hover:bg-black hover:text-white"
          onClick={() => addNewBlockAndUpdateStep()}
        >
          <p>Nouvelle section</p>
        </button>
      </form>
      <Quiz data={quizData} />
    </div>
  );
}

export default CreateTutorial;
