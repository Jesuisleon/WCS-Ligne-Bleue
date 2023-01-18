import React, { useState, useRef, useEffect } from "react";
import QuizTutorialEdit from "@components/create_tutorial/QuizTutorialEdit";
import HeaderTutorialEdit from "@components/create_tutorial/HeaderTutorialEdit";
import EditorTutorialEdit from "@components/create_tutorial/EditorTutorialEdit";
import axios from "axios";
import Cookies from "js-cookie";

const { VITE_BACKEND_URL } = import.meta.env;

function CreateTutorial() {
  const token = Cookies.get("userToken");
  const childsRefs = useRef([]);

  const [save, setSave] = useState(false);

  const [published, setPublished] = useState(false);

  const [tutorialId, setTutorialId] = useState(null);

  const [stepData, setStepData] = useState([]);

  const [headerData, setHeaderData] = useState({
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

  const getHeaderData = () => {
    const updatedData = childsRefs.current[0].getData();
    if (!updatedData) {
      alert("Veuillez remplir tous les champs");
      setSave(false);
      return;
    }
    setHeaderData(updatedData);
  };

  const getStepData = () => {
    const updatedStep = [...stepData];
    childsRefs.current.forEach((child, index) => {
      // bypass the header component childRef
      if (index === 0) return;
      // update the stepData with the childRef data
      updatedStep[index - 1].content = child.getData();
      setStepData(updatedStep);
    });
  };

  const postTutorial = (data) => {
    axios
      .post(`${VITE_BACKEND_URL}/tutorials`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTutorialId(res.data.id);
        alert("Votre tutoriel a bien été enregistrer");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const putTutorial = (data) => {
    axios
      .put(`${VITE_BACKEND_URL}/tutorials/${tutorialId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Votre tutoriel a bien été mis à jour");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveData = () => {
    const data = {
      title: headerData.title,
      objective: headerData.objective,
      description: headerData.description,
      difficulty: headerData.difficulty,
      hashtag: headerData.hashtag,
      theme: headerData.theme,
      step: JSON.stringify(stepData),
      author: "admin",
      published: false,
    };
    if (tutorialId) putTutorial(data);
    else postTutorial(data);
    setSave(false);
  };

  const getData = () => {
    setSave(true);
    getHeaderData();
    getStepData();
  };

  const publishTutorial = (data) => {
    axios
      .put(`${VITE_BACKEND_URL}/tutorialsonline/${tutorialId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert(`Votre tutoriel est ${published ? "hors ligne" : "en ligne"}`);
        setPublished(!published);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const publish = () => {
    const data = {
      publised: !published,
    };
    if (!tutorialId) {
      alert("Veuillez enregistrer votre tutoriel avant de le publier");
      return;
    }
    if (tutorialId) {
      publishTutorial(data);
    }
  };

  useEffect(() => {
    if (save) saveData();
  }, [save]);

  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setSave(false);
    setPreview(false);
  }, []);

  return (
    <div className="p-4 h-full w-full">
      <div className="absolute z-30 top-[2.9em] sm:top-[6.2em] flex justify-end gap-4 ">
        <button
          className="black-button"
          type="button"
          onClick={() => getData()}
        >
          <p>Enregistrer</p>
        </button>
        <button
          onClick={() => publish()}
          className="black-button"
          type="button"
        >
          <p>{published ? "Passer hors-ligne" : "Publier en ligne"}</p>
        </button>
        <button
          className="black-button"
          type="button"
          onClick={() => setPreview(!preview)}
        >
          <p>{preview ? "Edit" : "Preview"}</p>
        </button>
      </div>
      <HeaderTutorialEdit
        ref={(ref) => {
          childsRefs.current[0] = ref;
        }}
        getData={headerData}
        preview={preview}
      />
      {stepData.map((step, stepIndex) => {
        if (step.type === "editor") {
          return (
            <div className="tutorial-step" key={step.id}>
              <EditorTutorialEdit
                ref={(ref) => {
                  childsRefs.current[stepIndex + 1] = ref;
                }}
                data={stepData[stepIndex] ? stepData[stepIndex].content : ""}
                close={() => removeStep(stepIndex)}
                previewAll={preview}
              />
            </div>
          );
        }
        if (step.type === "quiz") {
          return (
            <div className="tutorial-step" key={step.id}>
              <QuizTutorialEdit
                ref={(ref) => {
                  childsRefs.current[stepIndex + 1] = ref;
                }}
                getData={
                  stepData[stepIndex] ? stepData[stepIndex].content : null
                }
                close={() => removeStep(stepIndex)}
                previewAll={preview}
              />
            </div>
          );
        }
        return null;
      })}
      {preview === false && (
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
          <button
            onClick={() => setStep("image")}
            type="button"
            className="black-button"
          >
            <p>Nouvelle image</p>
          </button>
          <button
            onClick={() => setStep("video")}
            type="button"
            className="black-button"
          >
            <p>Nouvelle vidéo</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateTutorial;
