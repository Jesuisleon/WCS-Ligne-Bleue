/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";

import Quiz from "@components/Quiz";

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export default function SidePreview({ open, setOpen, getData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getData);
  }, [getData]);

  const createMarkup = (content) => {
    return { __html: content };
  };

  if (data === null) {
    return null;
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="z-30 fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen">
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-2xl font-bold text-gray-900">
                        {" "}
                        Preview{" "}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="flex flex-col gap-14 mb-10 px-4 md:px-20 text-lg text-gray-800 divide-gray-200 ">
                      <div className="flex flex-col gap-6 pt-10">
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-14">
                          <div className="flex flex-col items-start sm:gap-2">
                            <h1 className="text-4xl font-semibold">Titre</h1>
                            <p className=" first-letter:capitalize">
                              {data.title}
                            </p>
                          </div>

                          <div className="flex flex-col items-start sm:gap-2">
                            <h1 className="text-4xl font-semibold">Objectif</h1>
                            <p className="first-letter:capitalize">
                              {data.objective}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:gap-2">
                          <h2 className="text-4xl font-semibold">
                            Description
                          </h2>
                          <div
                            className="first-letter:capitalize"
                            dangerouslySetInnerHTML={createMarkup(
                              data.description
                            )}
                          />
                        </div>
                      </div>

                      {/* STEPPERS */}
                      <div>
                        <h1 className="text-4xl font-semibold sm:mb-2">
                          Tutoriel
                        </h1>
                        <div className="flex flex-col items-center gap-6">
                          {data.step.map((step) => {
                            if (step.type === "quiz") {
                              return (
                                <div key={step.id} className="w-full">
                                  <Quiz key={step.id} data={step.content} />
                                </div>
                              );
                            }
                            return (
                              <div key={step.id} className="">
                                <div
                                  className="w-full"
                                  dangerouslySetInnerHTML={createMarkup(
                                    step.content
                                  )}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* /End replace */}
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
