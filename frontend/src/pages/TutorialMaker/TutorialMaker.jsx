import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "@context/AuthContext";

import axios from "axios";

import ToolBar from "@pages/TutorialMaker/ToolBar";
import SideBar from "@pages/TutorialMaker/SideBar";
import SidePreview from "@pages/TutorialMaker/SidePreview";

import TextMaker from "@pages/TutorialMaker/TextMaker";
import MediaMaker from "@pages/TutorialMaker/MediaMaker";
import QuizMaker from "@pages/TutorialMaker/QuizMaker";

import Sticky from "react-stickynode";

import NotificationWithActions from "@components/notifications/NotificationWithActions";
import ModalSimple from "@components/notifications/ModalSimple";

export default function TutorialMaker() {
  // CONFIGURATION
  const childsRefs = useRef([]);
  const navigate = useNavigate();

  const { userJourney, setUserJourney } = useContext(AuthContext);

  // TOGGLE SHOW/HIDE
  const [openNotificationWithActions, setOpenNotificationWithActions] =
    useState(false);
  const [openModalSimple, setOpenModalSimple] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSidePreview, setOpenSidePreview] = useState(false);

  // DATA STATES
  const [sideBarData, setSideBarData] = useState({
    title: "",
    objective: "",
    description: "",
    difficulty: "",
    hashtag: [],
    theme: "",
    published: false,
  });

  const [stepsData, setStepsData] = useState([]);
  useEffect(() => {
    // initialisation of the childsRefs when the stepsData is updated
    childsRefs.current = childsRefs.current.filter((item) => item !== null);
  }, [stepsData]);

  const { tutorialId } = useParams();

  // STEPS FUNCTIONS
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

  // SAVE POST PUT
  const [isWrongSubmit, setIsWrongSubmit] = useState(false);

  const [id, setId] = useState(undefined);

  const [save, setSave] = useState(false);

  const postTutorial = (data) => {
    axios
      .post(`/tutorials`, data)
      .then((res) => {
        setId(res.data.id);
        setOpenNotificationWithActions(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const putTutorial = (data) => {
    axios
      .put(`/tutorials/${id}`, data)
      .then(() => {
        setOpenNotificationWithActions(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchData = (paramId) => {
    axios
      .get(`/tutorials/${paramId}`)
      .then((res) => {
        setSideBarData({
          title: res.data.title,
          objective: res.data.objective,
          description: res.data.description,
          difficulty: res.data.difficulty_id,
          hashtag: res.data.hashtag.map((item) => item.text),
          theme: res.data.theme_id,
          published: res.data.published === 1,
        });

        // PARSE THE STEP
        res.data.step = JSON.parse(res.data.step);
        res.data.step = res.data.step.map((item) => {
          return {
            ...item,
            preview: false,
          };
        });

        // SORT THE STEP BY ID
        res.data.step.sort((a, b) => a.id - b.id);
        setStepsData(res.data.step);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/404");
        }
      });
  };

  const getStepsData = () => {
    const updatedStep = [...stepsData];

    childsRefs.current.forEach((child, index) => {
      // bypass the header component childRef
      if (index === 0) return;
      // update the stepData with the childRef data
      updatedStep[index - 1].content = child.getData();
    });
    setStepsData(updatedStep);
  };

  const getData = () => {
    const updatedStep = [...stepsData];

    childsRefs.current.forEach((child, index) => {
      // bypass the header component childRef
      if (index === 0) return;
      // update the stepData with the childRef data
      updatedStep[index - 1].content = child.getData();
    });

    if (updatedStep.some((step) => step.content === "error")) return;

    setStepsData(updatedStep);

    const updatedData = childsRefs.current[0].getData();
    if (!updatedData) {
      setOpenModalSimple(true);
      setIsWrongSubmit(true);
      setSave(false);
    } else {
      setSideBarData(updatedData);
      setSave(true);
    }
  };

  const saveData = () => {
    const data = {
      title: sideBarData.title,
      objective: sideBarData.objective,
      description: sideBarData.description,
      difficulty: sideBarData.difficulty,
      hashtag: sideBarData.hashtag,
      theme: sideBarData.theme,
      step: JSON.stringify(stepsData),
      author: "admin",
      published: sideBarData.published ? 1 : 0,
    };

    if (id === undefined) {
      postTutorial(data);
    } else {
      putTutorial(data);
    }
    setSave(false);
  };

  useEffect(() => {
    if (save) saveData();
  }, [save]);

  useEffect(() => {
    if (openNotificationWithActions) {
      if (userJourney.find((item) => item.id === id)) return;
      const updatedJourney = {
        id,
        user_id: null,
        theme_id: sideBarData.theme,
      };
      setUserJourney([...userJourney, updatedJourney]);
    }
  }, [openNotificationWithActions]);

  // PREVIEW
  const [preview, setPreview] = useState(false);

  const setPreviewSingle = (index) => {
    const updatedStep = [...stepsData];
    updatedStep[index].preview = !updatedStep[index].preview;
    setStepsData(updatedStep);
  };

  // PREVIEW ALL
  const [previewAllData, setPreviewAllData] = useState(null);

  const setPreviewAll = () => {
    const updatedStep = [...stepsData];

    childsRefs.current.forEach((child, index) => {
      if (index === 0) return;
      updatedStep[index - 1].content = child.getData();
    });

    if (updatedStep.some((step) => step.content === "error")) return;

    const updatedData = childsRefs.current[0].getData();

    const data = {
      title: updatedData.title,
      objective: updatedData.objective,
      description: updatedData.description,
      step: updatedStep,
    };
    setPreviewAllData(data);
    setOpenSidePreview(!openSidePreview);
  };

  //  INITIALIZATION
  useEffect(() => {
    if (tutorialId === undefined) {
      setOpenSideBar(true);
    } else {
      fetchData(tutorialId);
      setId(tutorialId);
      setOpenSideBar(false);
    }
    setSave(false);
    setPreview(false);
  }, []);

  return (
    <div className="p-4 h-full w-full">
      {/* Alert Actions */}
      <ModalSimple
        title="Il manque des informations."
        message="Veuillez remplir les champs manquant."
        open={openModalSimple}
        setOpen={() => {
          setOpenModalSimple(false);
        }}
      />
      <NotificationWithActions
        title="Félicitations !"
        message="Votre tutoriel a bien été enregistré."
        show={openNotificationWithActions}
        setShow={setOpenNotificationWithActions}
        nextStep={() => {
          setOpenNotificationWithActions(false);
          navigate(`/theme/${sideBarData.theme}/tutorial/${id}`);
        }}
      />

      {/* SideBar */}
      <Sticky enabled top={0} innerZ={20} activeClass="sticky-nav-active">
        <div className="absolute left-[1em]">
          <button
            type="button"
            onClick={() => setOpenSideBar(!openSideBar)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </Sticky>
      <SideBar
        ref={(ref) => {
          childsRefs.current[0] = ref;
        }}
        open={openSideBar}
        setOpen={setOpenSideBar}
        getData={sideBarData}
        save={() => {
          getData();
          // getSideBarData();
        }}
        isWrongSubmit={isWrongSubmit}
        tutorialId={tutorialId}
      />

      {/* sidePreview */}
      <Sticky enabled top={0} innerZ={20} activeClass="sticky-nav-active">
        <div className="absolute right-[1em]">
          <button
            type="button"
            onClick={() => setPreviewAll()}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </Sticky>
      <SidePreview
        open={openSidePreview}
        setOpen={setOpenSidePreview}
        getData={previewAllData}
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
                    updatedStep[stepIndex].preview = true;
                    setStepsData(updatedStep);
                  }}
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

      {/* Steps Maker Buttons */}
      <div className="text-center flex flex-col items-center">
        {stepsData.length < 1 && (
          <>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Création de contenue
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Veuillez choisir votre type de contenue.
            </p>
          </>
        )}
        <div className="mt-6 space-x-5">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              onClick={() => setStep("text")}
              type="button"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Nouveau texte
            </button>
            <button
              onClick={() => setStep("image")}
              type="button"
              className="-ml-px relative inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Nouvelle image
            </button>
            <button
              onClick={() => setStep("video")}
              type="button"
              className="-ml-px relative inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
              Nouvelle Vidéo
            </button>
            <button
              onClick={() => setStep("quiz")}
              type="button"
              className="-ml-px relative inline-flex items-center gap-2 px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                />
              </svg>
              Nouveau Quiz
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
