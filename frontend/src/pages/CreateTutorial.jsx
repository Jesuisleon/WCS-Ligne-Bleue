import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import stockedData from "./data";

const { VITE_BACKEND_URL } = import.meta.env;

const quizDataForTest = [
  {
    type: "quiz",
    step: "",
    data: [
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
    ],
  },
];

function CreateQuizz({ submitData }) {
  const step = "2";
  const [data, setData] = useState([]);

  useEffect(() => {
    if (quizDataForTest.length > 0) setData(quizDataForTest[0].data);
  }, []);

  function addNewQuestion() {
    const newQuestion = { id: data.length + 1, question: "", answers: [] };
    const newQuestionArray = [...data, newQuestion];
    setData(newQuestionArray);
  }

  function handleQuestionChange(e) {
    const { value, id } = e.target;
    const newQuestionArray = [...data];
    newQuestionArray[id].question = value;
    setData(newQuestionArray);
  }

  function addNewAnswer(questionId) {
    const newAnswer = {
      id: data[questionId].answers.length + 1,
      text: "",
      correct: false,
    };

    const newAnswerArray = data.map((question) => {
      if (question.id === questionId + 1) {
        return { ...question, answers: [...question.answers, newAnswer] };
      }
      return question;
    });
    setData(newAnswerArray);
  }

  function handleAnswerChange(e) {
    const { value, id, name } = e.target;
    const newAnswerArray = [...data];
    newAnswerArray[id].answers[name].text = value;
    setData(newAnswerArray);
  }

  function handleAnswerCorrect(e) {
    const { id, name } = e.target;
    const newAnswerArray = [...data];
    newAnswerArray[id].answers[name].correct =
      !newAnswerArray[id].answers[name].correct;
    setData(newAnswerArray);
  }

  function deleteQuestion(id) {
    const newQuestionArray = data.filter((e) => e.id !== id);
    setData(newQuestionArray);
  }

  function deleteAnswer(questionId, answerId) {
    const newAnswerArray = data.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answers: question.answers.filter((answer) => answer.id !== answerId),
        };
      }
      return question;
    });
    setData(newAnswerArray);
  }

  function handleSubmitData(e) {
    e.preventDefault();
    submitData({ step, quiz: data });
  }

  return (
    <div className="p-4 h-full w-full bg-white rounded-r-lg mb-4">
      <form
        action="submit"
        onSubmit={handleSubmitData}
        className="flex flex-col gap-4 items-start justify-start w-full"
      >
        {data.map((question) => (
          <div key={question.id} className="flex flex-col items-start gap-4">
            <div className="border-b-2 p-1 flex gap-4 items-center w-full">
              <button
                type="button"
                className="bg-red-400 text-sm text-white rounded px-1"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer cette question ?"
                    )
                  )
                    deleteQuestion(question.id);
                }}
              >
                X
              </button>
              <label htmlFor="question" className="text-xl font-bold">
                {question.id}.
                <input
                  placeholder="Votre Question"
                  size={question.question.length}
                  className="text-xl font-bold"
                  type="text"
                  id={question.id - 1}
                  value={question.question}
                  onChange={(e) => {
                    handleQuestionChange(e);
                  }}
                />
              </label>
            </div>
            {question.answers.map((answer) => (
              <div key={answer.id} className="flex gap-4 items-center w-full">
                <button
                  type="button"
                  className="bg-red-400 text-sm text-white rounded px-1"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer cette réponse ?"
                      )
                    )
                      deleteAnswer(question.id, answer.id);
                  }}
                >
                  X
                </button>
                <input
                  type="checkbox"
                  id={question.id - 1}
                  name={answer.id - 1}
                  checked={answer.correct}
                  onChange={(e) => {
                    handleAnswerCorrect(e);
                  }}
                />
                <input
                  placeholder="Votre réponse"
                  className={`${answer.correct && "text-green-500"}`}
                  size={answer.text.length}
                  type="text"
                  name={answer.id - 1}
                  id={question.id - 1}
                  value={answer.text}
                  onChange={(e) => {
                    handleAnswerChange(e);
                  }}
                />
              </div>
            ))}
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => addNewAnswer(question.id - 1)}
            >
              Ajouter une réponse
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={addNewQuestion}
        >
          Nouvelle question
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Valider
        </button>
      </form>
    </div>
  );
}

function CreateTutorial() {
  const author = "Michel";

  const initialData = [].concat(stockedData);

  const [editorData, setEditorData] = useState([]);

  const [anotherData, setAnotherData] = useState([]);

  const [quizData, setQuizData] = useState([]);

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
      content: JSON.stringify(editorData) + JSON.stringify(quizData),
      hashtag: anotherData.hashtag,
      author,
      theme: anotherData.theme,
    };
    // console.log(JSON.stringify(data));
    axios.post(`${VITE_BACKEND_URL}/tutorials`, data);
  }
  // to store the image date from the editor to the backend
  const handleImageEditor = (blobInfo, progress) => {
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
          reject(new Error(`Invalid JSON: ${xhr.responseText}`));
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
      formData.append("image", blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    });
  };

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
    const newStep = { step: editorData.length + 1, text: "", type: "text" };
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
        <div className="flex items-center gap-4 mb-4 bg-white w-full justify-around p-6">
          <div className="flex flex-col gap-2 items-start ">
            <h2 className="text-2xl font-bold">Théme</h2>
            <select
              onChange={(e) =>
                handleInputChange(e.target.value, { id: "theme" })
              }
              name="theme"
              id="theme"
            >
              <option value="1">Utiliser ligne Bleue</option>
              <option value="2">Utiliser mon téléphone</option>
              <option value="3">Aller sur internet</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 items-start ">
            <h2 className="text-2xl font-bold">Niveau</h2>
            <select
              onChange={(e) =>
                handleInputChange(e.target.value, { id: "difficulty" })
              }
              name="difficulty"
              id="difficulty"
            >
              <option value="Débutant">Débutant</option>
              <option value="Facile">Facile</option>
              <option value="Novice">Novice</option>
            </select>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-2xl font-bold">Hashtag</h2>
            <input
              onChange={(e) =>
                handleInputChange(e.target.value, { id: "hashtag" })
              }
              placeholder="Vos hashtag"
              name="hashtag"
              id="hashtag"
              type="textarea"
              defaultValue={anotherData ? anotherData.hashtag : ""}
            />
          </div>
        </div>
        <div className="bg-white p-6 w-full grid justify-center items-center gap-4 grid-cols-4 lg:grid-cols-6 auto-rows-auto lg:grid-rows-1 border-y-2">
          <div className="col-span-1 m-auto">
            <img src="https://via.placeholder.com/150" alt="logo" />
          </div>
          <div className="col-span-3 lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-2xl font-bold">
                Titre
              </label>
              <input
                onChange={(e) =>
                  handleInputChange(e.target.value, { id: "title" })
                }
                placeholder="Votre titre"
                name="title"
                id="title"
                type="text"
                defaultValue={anotherData ? anotherData.title : ""}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="objective" className="text-2xl font-bold">
                Objectif
              </label>
              <input
                onChange={(e) =>
                  handleInputChange(e.target.value, { id: "objective" })
                }
                placeholder="Votre objectif"
                name="objective"
                id="objective"
                type="text"
                defaultValue={anotherData ? anotherData.objective : ""}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2 col-span-4 lg:col-span-3 lg:row-auto h-full">
            <h2 className="text-2xl font-bold">Description</h2>
            <Editor
              apiKey="9t40bxm0c2coeb5xw6ui3a8g1ng5eywiv3elxxlq6vtclsdy"
              id="description"
              onEditorChange={(e) =>
                handleInputChange(e, { id: "description" })
              }
              value={anotherData ? anotherData.description : ""}
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
                  images_upload_handler: handleImageEditor,
                }}
              />
            </div>
          );
        })}
      </form>
      <CreateQuizz submitData={(data) => setQuizData(data)} />
      <button
        type="button"
        className="m-4 p-2 rounded-xl bg-white cursor-pointer text-lg shadow-md hover:bg-black hover:text-white"
        onClick={() => addNewBlockAndUpdateStep()}
      >
        <p>Nouvelle section</p>
      </button>
    </div>
  );
}

export default CreateTutorial;
