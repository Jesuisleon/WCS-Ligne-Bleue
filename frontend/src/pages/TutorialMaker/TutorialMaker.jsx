import React, { useState, useRef, useEffect } from "react";

import { ToolBar } from "@pages/TutorialMaker/ToolBar";
import SideBar from "@pages/TutorialMaker/SideBar";
import TextMaker from "@pages/TutorialMaker/TextMaker";
import MediaMaker from "@pages/TutorialMaker/MediaMaker";
import QuizMaker from "@pages/TutorialMaker/QuizMaker";

import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

function TutorialMaker() {
  const childsRefs = useRef([]);

  const [openSideBar, setOpenSideBar] = useState(true);

  const [save, setSave] = useState(false);

  // const [published, setPublished] = useState(false);

  const [tutorialId, setTutorialId] = useState(null);

  const [stepsData, setStepsData] = useState([]);

  useEffect(() => {
    childsRefs.current = childsRefs.current.filter((item) => item !== null);
  }, [stepsData]);

  const [headerData, setHeaderData] = useState({
    title: "",
    objective: "",
    description: "",
    difficulty: "",
    hashtag: [],
    theme: "",
    published: false,
  });

  const setStep = (type) => {
    const step = {
      id: stepsData.length + 1,
      type,
      content: null,
      preview: false,
    };
    const updatedStep = [...stepsData, step];
    setStepsData(updatedStep);
  };

  const updateIndex = (element) => {
    const updatedIndex = element.map((item, index) => {
      return { ...item, id: index + 1 };
    });
    return updatedIndex;
  };

  const moveStep = (index, direction) => {
    const updatedStep = [...stepsData];
    const step = updatedStep.splice(index, 1);
    if (direction === "up") {
      updatedStep.splice(index - 1, 0, step[0]);
    }
    if (direction === "down") {
      updatedStep.splice(index + 1, 0, step[0]);
    }

    setStepsData(updateIndex(updatedStep));
  };

  const removeStep = (index) => {
    const updatedStep = [...stepsData];
    updatedStep.splice(index, 1);
    setStepsData(updateIndex(updatedStep));
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

  const getStepsData = () => {
    const updatedStep = [...stepsData];
    childsRefs.current.forEach((child, index) => {
      // bypass the header component childRef
      if (index === 0) return;
      // update the stepData with the childRef data
      updatedStep[index - 1].content = child.getData();
      setStepsData(updatedStep);
    });
  };

  const postTutorial = (data) => {
    axios
      .post(`/tutorials`, data)
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
      .put(`/tutorials/${tutorialId}`, data)
      .then(() => {
        alert("Votre tutoriel a bien été mis à jour");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const publishTutorial = (data) => {
  //   axios
  //     .put(`/tutorials-published/${tutorialId}`, data)
  //     .then(() => {
  //       alert(`Votre tutoriel est ${published ? "hors ligne" : "en ligne"}`);
  //       setPublished(!published);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const getImageSteps = (data) => {
    const image = data.filter(({ type }) => type === "image");
    return image;
  };

  const getSrcImage = (data) => {
    return data.map(
      ({ content }) => content.split("src")[1].split("alt")[0].split('"')[1]
    );
  };

  const getDeletedHost = (data) => {
    return data.map((item) => item.split(VITE_BACKEND_URL)[1]);
  };

  const setDeletedHostToContent = (data) => {
    return stepsData.map((item) => {
      if (item.type === "image") {
        return {
          ...item,
          content: item.content.replace(/src="[^"]+"/, `src="${data}"`),
        };
      }
      return item;
    });
  };

  const saveData = () => {
    const updatedStepsData = setDeletedHostToContent(
      getDeletedHost(getSrcImage(getImageSteps(stepsData)))
    );

    const data = {
      title: headerData.title,
      objective: headerData.objective,
      description: headerData.description,
      difficulty: headerData.difficulty,
      hashtag: headerData.hashtag,
      theme: headerData.theme,
      step: JSON.stringify(updatedStepsData),
      author: "admin",
    };

    if (tutorialId) putTutorial(data);
    else postTutorial(data);
    setSave(false);
  };

  // const publish = () => {
  //   const data = {
  //     published: !published,
  //   };
  //   if (!tutorialId) {
  //     alert("Veuillez enregistrer votre tutoriel avant de le publier");
  //     return;
  //   }
  //   if (tutorialId) {
  //     publishTutorial(data);
  //   }
  // };

  useEffect(() => {
    if (save) saveData();
  }, [save]);

  const [preview, setPreview] = useState(false);

  const setPreviewSingle = (index) => {
    const updatedStep = [...stepsData];
    updatedStep[index].preview = !updatedStep[index].preview;
    setStepsData(updatedStep);
  };

  // const setPreviewAll = () => {
  //   const updatedStep = stepsData.map((step) => {
  //     return { ...step, preview: !preview };
  //   });
  //   setPreview(!preview);
  //   setStepsData(updatedStep);
  // };

  useEffect(() => {
    setSave(false);
    setPreview(false);
  }, []);

  return (
    <div className="p-4 h-full w-full">
      {/* SideBar */}

      <div className="absolute z-30 top-[2.9em] sm:top-[6.2em] right-[1em] flex justify-end gap-4 ">
        <button type="button" onClick={() => setOpenSideBar(!openSideBar)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <SideBar
        ref={(ref) => {
          childsRefs.current[0] = ref;
        }}
        open={openSideBar}
        setOpen={setOpenSideBar}
        getData={headerData}
        save={() => {
          getStepsData();
          getHeaderData();
          setSave(true);
        }}
      />

      {/* Steppers */}
      <div className="mt-4 flex flex-col gap-4">
        {stepsData.map((step, stepIndex) => {
          if (step.type === "text") {
            return (
              <div key={step.id}>
                {preview === false && (
                  <ToolBar
                    type={step.type}
                    stepIndex={stepIndex}
                    lastStepIndex={stepsData.length - 1}
                    setPreview={() => setPreviewSingle(stepIndex)}
                    preview={step.preview}
                    moveStep={(direction) => {
                      getStepsData();
                      moveStep(stepIndex, direction);
                    }}
                    close={() => removeStep(stepIndex)}
                  />
                )}
                <TextMaker
                  ref={(ref) => {
                    childsRefs.current[stepIndex + 1] = ref;
                  }}
                  data={
                    stepsData[stepIndex] ? stepsData[stepIndex].content : ""
                  }
                  preview={step.preview}
                />
              </div>
            );
          }
          if (step.type === "image" || step.type === "video") {
            return (
              <div
                key={step.id}
                className={step.content === "" ? "hidden" : ""}
              >
                {preview === false && (
                  <ToolBar
                    type={step.type}
                    stepIndex={stepIndex}
                    lastStepIndex={stepsData.length - 1}
                    preview={step.preview}
                    moveStep={(direction) => {
                      getStepsData();
                      moveStep(stepIndex, direction);
                    }}
                    close={() => removeStep(stepIndex)}
                  />
                )}
                <MediaMaker
                  ref={(ref) => {
                    childsRefs.current[stepIndex + 1] = ref;
                  }}
                  type={step.type}
                  data={
                    stepsData[stepIndex] ? stepsData[stepIndex].content : ""
                  }
                  setData={(data) => {
                    const updatedStep = [...stepsData];
                    updatedStep[stepIndex].content = data;
                    setStepsData(updatedStep);
                  }}
                  previewAll={step.preview}
                  close={() => removeStep(stepIndex)}
                />
              </div>
            );
          }
          if (step.type === "quiz") {
            return (
              <div key={step.id}>
                {preview === false && (
                  <ToolBar
                    type={step.type}
                    stepIndex={stepIndex}
                    lastStepIndex={stepsData.length - 1}
                    setPreview={() => setPreviewSingle(stepIndex)}
                    preview={step.preview}
                    moveStep={(direction) => {
                      getStepsData();
                      moveStep(stepIndex, direction);
                    }}
                    close={() => removeStep(stepIndex)}
                  />
                )}
                <QuizMaker
                  ref={(ref) => {
                    childsRefs.current[stepIndex + 1] = ref;
                  }}
                  data={
                    stepsData[stepIndex] ? stepsData[stepIndex].content : null
                  }
                  preview={step.preview}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Set new Stepper by type */}
      {preview === false && (
        <div className="flex justify-center gap-4 m-4 w-full">
          <button
            type="button"
            className="black-button"
            onClick={() => setStep("text")}
          >
            <p>Text</p>
          </button>
          <button
            onClick={() => setStep("image")}
            type="button"
            className="black-button"
          >
            <p>image</p>
          </button>

          <button
            onClick={() => setStep("video")}
            type="button"
            className="black-button"
          >
            <p>vidéo</p>
          </button>
          <button
            type="button"
            className="black-button"
            onClick={() => setStep("quiz")}
          >
            <p>Quiz</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default TutorialMaker;
