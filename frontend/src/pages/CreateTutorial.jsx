import React, { useState, useRef } from "react";
import QuizTutorialEdit from "@components/create_tutorial/QuizTutorialEdit";
import HeaderTutorialEdit from "@components/create_tutorial/HeaderTutorialEdit";
import EditorTutorialEdit from "@components/create_tutorial/EditorTutorialEdit";
import axios from "axios";
import Cookies from "js-cookie";

const { VITE_BACKEND_URL } = import.meta.env;

const quizDataForTest = [
  {
    content: [
      // {
      //   id: 1,
      //   question: "Quelle est la capitale de la France?",
      //   answers: [
      //     { id: 1, text: "Londres", correct: false },
      //     { id: 2, text: "Paris", correct: true },
      //     { id: 3, text: "Berlin", correct: false },
      //     { id: 4, text: "New York", correct: false },
      //   ],
      // },
      // {
      //   id: 2,
      //   question: "Combien y a-t-il de jours dans une année?",
      //   answers: [
      //     { id: 1, text: "365", correct: true },
      //     { id: 2, text: "366", correct: false },
      //     { id: 3, text: "364", correct: false },
      //     { id: 4, text: "360", correct: false },
      //   ],
      // },
    ],
  },
];

function CreateTutorial() {
  const token = Cookies.get("userToken");
  const author = Cookies.get("firstName");

  const childsRefs = useRef([]);
  const [stepData, setStepData] = useState([]);
  const [basicData, setBasicData] = useState({
    title: "",
    objective: "",
    description: "",
    difficulty: "",
    hashtag: "",
    theme: "",
  });

  const setStep = (type) => {
    const step = { id: stepData.length + 1, type, content: "" };
    const updatedStep = [...stepData, step];
    setStepData(updatedStep);
  };

  const updateIndex = (element) => {
    element.map((item, index) => {
      return item.id === index + 1;
    });
  };

  const removeStep = (index) => {
    const updatedStep = [...stepData];
    updatedStep.splice(index, 1);
    updateIndex(updatedStep);
    setStepData(updatedStep);
  };

  const getDataFromStep = () => {
    const updatedStep = [...stepData];
    childsRefs.current.forEach((child, index) => {
      if (index === 0) return;
      updatedStep[index - 1].content = child.getData();
    });

    const updatedData = childsRefs.current[0].getData();
    setBasicData(updatedData);
    setStepData(updatedStep);
  };

  const submitData = () => {
    const data = {
      title: basicData.title,
      objective: basicData.objective,
      description: basicData.description,
      difficulty: basicData.difficulty,
      hashtag: basicData.hashtag,
      theme: basicData.theme,
      step: JSON.stringify(stepData),
      author,
    };
    // console.log(JSON.stringify(data));

    axios.post(`${VITE_BACKEND_URL}/tutorials`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="p-4 h-full w-full">
      <div className="absolute z-30 top-[2.9em] sm:top-[6em] flex justify-end gap-4 ">
        <button
          className="bg-blue-600 p-1 sm:p-3 text-white font-normal sm:font-semibold rounded sm:rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          onClick={() => getDataFromStep()}
        >
          <p>Enregistrer</p>
        </button>
        <button
          className="bg-emerald-600 p-1 sm:p-3 text-white font-normal sm:font-semibold rounded sm:rounded-xl shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
          type="button"
          onClick={() => submitData()}
        >
          <p>Publier</p>
        </button>
      </div>
      <HeaderTutorialEdit
        ref={(ref) => {
          childsRefs.current[0] = ref;
        }}
        getData={basicData}
      />
      {stepData.map((step, stepIndex) => {
        return (
          <div className="bg-white rounded-xl w-full my-2" key={step.id}>
            {step.type === "editor" ? (
              <EditorTutorialEdit
                ref={(ref) => {
                  childsRefs.current[stepIndex + 1] = ref;
                }}
                data={stepData[stepIndex] ? stepData[stepIndex].content : ""}
                close={() => removeStep(stepIndex)}
              />
            ) : (
              <QuizTutorialEdit
                ref={(ref) => {
                  childsRefs.current[stepIndex + 1] = ref;
                }}
                // getData={stepData[index] ? stepData[index].content : ""}
                getData={quizDataForTest[0].content}
                close={() => removeStep(stepIndex)}
              />
            )}
          </div>
        );
      })}
      <button
        type="button"
        className="m-4 p-2 rounded-xl bg-white cursor-pointer text-lg shadow-md hover:bg-black hover:text-white"
        onClick={() => setStep("editor")}
      >
        <p>Nouvelle section</p>
      </button>
      <button
        type="button"
        className="m-4 p-2 rounded-xl bg-white cursor-pointer text-lg shadow-md hover:bg-black hover:text-white"
        onClick={() => setStep("quiz")}
      >
        <p>Nouveau Quiz</p>
      </button>
    </div>
  );
}

export default CreateTutorial;
