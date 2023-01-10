import React, { useState, useRef } from "react";
import QuizTutorialEdit from "@components/create_tutorial/QuizTutorialEdit";
import HeaderTutorialEdit from "@components/create_tutorial/HeaderTutorialEdit";
import EditorTutorialEdit from "@components/create_tutorial/EditorTutorialEdit";
import axios from "axios";
import Cookies from "js-cookie";

const { VITE_BACKEND_URL } = import.meta.env;

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
    const step = { id: stepData.length + 1, type, content: null };
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

  const saveHeaderData = () => {
    const updatedData = childsRefs.current[0].getData();
    if (!updatedData) {
      alert("Veuillez remplir tous les champs");
    }
    setBasicData(updatedData);
  };

  const saveStepData = () => {
    const updatedStep = [...stepData];
    childsRefs.current.forEach((child, index) => {
      // bypass the header component childRef
      if (index === 0) return;
      // update the stepData with the childRef data
      updatedStep[index - 1].content = child.getData();
      setStepData(updatedStep);
    });
  };

  const saveData = () => {
    saveHeaderData();
    saveStepData();
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
    axios.post(`${VITE_BACKEND_URL}/tutorials`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="p-4 h-full w-full">
      <div className="absolute z-30 top-[2.9em] sm:top-[6.2em] flex justify-end gap-4 ">
        <button
          className="black-button"
          type="button"
          onClick={() => saveData()}
        >
          <p>Enregistrer</p>
        </button>
        <button
          className="black-button"
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
          <div className="tutorial-step" key={step.id}>
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
                getData={
                  stepData[stepIndex] ? stepData[stepIndex].content : null
                }
                close={() => removeStep(stepIndex)}
              />
            )}
          </div>
        );
      })}
      <div className="flex gap-4 m-4 w-full">
        <button
          type="button"
          className="black-button"
          onClick={() => setStep("editor")}
        >
          <p>Nouvelle section</p>
        </button>
        <button
          type="button"
          className="black-button"
          onClick={() => setStep("quiz")}
        >
          <p>Nouveau Quiz</p>
        </button>
      </div>
    </div>
  );
}

export default CreateTutorial;
