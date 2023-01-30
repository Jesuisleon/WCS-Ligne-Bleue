import React, {
  Fragment,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  useContext,
} from "react";

import { NavigationContext } from "@context/NavigationContext";

import axios from "axios";

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import { TextInput } from "./inputs/TextInput";
import { TextAreaInput } from "./inputs/TextAreaInput";
import { SelectInput } from "./inputs/SelectInput";
import { HashtagInput } from "./inputs/HashtagInput";

const SideBar = forwardRef(
  ({ open, setOpen, getData, save, preview, isWrongSubmit }, ref) => {
    const { navigationTheme } = useContext(NavigationContext);

    const [difficulties, setDifficulties] = useState([]);

    const [invalid, setInvalid] = useState({
      theme: true,
      difficulty: true,
      title: true,
      objective: true,
      description: true,
      hashtag: true,
    });

    const [data, setData] = useState();

    useEffect(() => {
      axios.get(`/difficulties`).then((response) => {
        setDifficulties(response.data);
      });
    }, []);

    useEffect(() => {
      if (getData !== data) {
        setData(getData);
      }
    }, [getData]);

    const childRef = useRef(null);
    useImperativeHandle(ref, () => ({
      getData: () => {
        if (Object.values(invalid).every((e) => e === false)) {
          return data;
        }
        return false;
      },
    }));

    function handleInput(content, editor) {
      // store the data
      setData({ ...data, [editor.id]: content });
      // check if input is valid
      if (content === "" || content === null || content.length === 0)
        setInvalid({ ...invalid, [editor.id]: true });
      else setInvalid({ ...invalid, [editor.id]: false });
    }

    if (navigationTheme) {
      return (
        <Transition.Root show={open} as={Fragment} ref={childRef}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden z-30 "
            onClose={setOpen}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Dialog.Overlay className="absolute inset-0" />

              <div className="pointer-events-none inset-y-0 fixed right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                {" "}
                                Configuration{" "}
                              </Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Voici votre panneau d'édition pour créer ou
                                modifier un tutoriel.
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}
                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          {/* Tutorial Title */}
                          <TextInput
                            type="title"
                            name="Titre"
                            placeholder="Choississez un titre pour votre tutoriel"
                            maxlength="50"
                            defaultValue={data ? data.title : ""}
                            handleInput={(e) =>
                              handleInput(e.target.value, { id: "title" })
                            }
                            invalid={invalid.title}
                            isSubmit={isWrongSubmit}
                          />
                          {/* Tutorial Objectif */}
                          <TextInput
                            type="objective"
                            name="Objectif"
                            placeholder="Quel est l'objectif de votre tutoriel ?"
                            maxlength="80"
                            defaultValue={data ? data.objective : ""}
                            handleInput={(e) =>
                              handleInput(e.target.value, { id: "objective" })
                            }
                            invalid={invalid.objective}
                            isSubmit={isWrongSubmit}
                          />

                          {/* Tutorial Description */}
                          <TextAreaInput
                            handleInput={(e) =>
                              handleInput(e.target.value, { id: "description" })
                            }
                            defaultValue={data ? data.description : ""}
                            maxlength="1000"
                            invalid={invalid.description}
                            isSubmit={isWrongSubmit}
                          />

                          {/* Tutorial Theme */}
                          <SelectInput
                            name="Theme"
                            placeholder="Choississez un thème"
                            value={
                              data && data.theme
                                ? navigationTheme.filter(
                                    (e) => e.id === data.theme
                                  )[0].name
                                : ""
                            }
                            optionValues={navigationTheme.map((e) => e.name)}
                            handleInput={(e) => handleInput(e, { id: "theme" })}
                            invalid={invalid.theme}
                            isSubmit={isWrongSubmit}
                          />

                          {/* Tutorial Difficulty */}
                          <SelectInput
                            name="Niveau"
                            placeholder="Choississez un niveau de difficulté"
                            value={
                              data && data.difficulty
                                ? difficulties.filter(
                                    (e) => e.id === data.difficulty
                                  )[0].name
                                : ""
                            }
                            optionValues={difficulties.map((e) => e.name)}
                            handleInput={(e) =>
                              handleInput(e, { id: "difficulty" })
                            }
                            invalid={invalid.difficulty}
                            isSubmit={isWrongSubmit}
                          />

                          {/* Tutorial Hashtag */}
                          <HashtagInput
                            defaultValue={
                              data && data.hashtag ? data.hashtag : ""
                            }
                            handleInput={(e) =>
                              handleInput(e, { id: "hashtag" })
                            }
                            isSubmit={isWrongSubmit}
                          />
                          {/* Privacy */}
                          <fieldset>
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <legend className="text-sm font-medium text-gray-900">
                                  Privacy
                                </legend>
                              </div>
                              <div className="space-y-5 sm:col-span-2">
                                <div className="space-y-5 sm:mt-0">
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-5 items-center">
                                      <input
                                        checked={
                                          data && data.published === true
                                        }
                                        onChange={() =>
                                          handleInput(true, { id: "published" })
                                        }
                                        id="public-access"
                                        name="privacy"
                                        aria-describedby="public-access-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                      />
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <label
                                        htmlFor="public-access"
                                        className="font-medium text-gray-900"
                                      >
                                        {" "}
                                        Public{" "}
                                      </label>
                                      <p
                                        id="public-access-description"
                                        className="text-gray-500"
                                      >
                                        Ce tutoriel sera visible par tous les
                                        utilisateurs
                                      </p>
                                    </div>
                                  </div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-5 items-center">
                                      <input
                                        checked={
                                          data && data.published === false
                                        }
                                        onChange={() =>
                                          handleInput(false, {
                                            id: "published",
                                          })
                                        }
                                        id="private-access"
                                        name="privacy"
                                        aria-describedby="private-access-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                                      />
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <label
                                        htmlFor="private-access"
                                        className="font-medium text-gray-900"
                                      >
                                        {" "}
                                        Privée{" "}
                                      </label>
                                      <p
                                        id="private-access-description"
                                        className="text-gray-500"
                                      >
                                        Vous seul pourrez accéder à ce tutoriel
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0" />
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={save}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Enregistrer
                          </button>
                          <button
                            onClick={preview}
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-sm font-medium text-blue-700 shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      );
    }
    return null;
  }
);

export default SideBar;
