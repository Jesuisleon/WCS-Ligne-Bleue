import { Fragment, useState, useEffect } from "react";
import * as ReactRouter from "react-router-dom";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import regexDate from "../../services/utils/utilFunctions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const { Link } = ReactRouter;

export default function Example({ commentTutoId, open, setOpen }) {
  const [commentData, setCommentData] = useState();

  useEffect(() => {
    if (!commentData) {
      axios
        .get(`/journeys-comments/${commentTutoId}`)
        .then((response) => {
          setCommentData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="h-[70vh] w-3/4 inline-block align-bottom bg-white rounded-lg py-3 px-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
              <div className="flex justify-between">
                <h2>Tutoriel: {commentData && commentData[0].title}</h2>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-3xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              </div>
              <div className="box-content">
                {commentData && (
                  <div className="bg-white box-content">
                    <div className="overflow-y-scroll box-border">
                      <h2 className="">Commentaires</h2>
                      <div className="border rounded-2xl box-border">
                        {commentData.map((comment) => (
                          <div
                            key={comment.user_id}
                            className="flex flex-col text-sm text-gray-500 space-x-4 p-2"
                          >
                            <button
                              type="button"
                              className="inline-flex items-start w-fit  px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gradient-to-b 
                              from-blue-700 
                              to-blue-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <Link
                                className="box-content  "
                                to={`/user/${comment.user_id}`}
                              >
                                <h3 className="font-medium text-white">
                                  {comment.firstname} {comment.lastname}
                                </h3>
                              </Link>
                            </button>

                            <p>
                              <time dateTime={comment.creation_date}>
                                {regexDate(comment.creation_date)}
                              </time>
                            </p>

                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    comment.rating > rating
                                      ? "text-yellow-400"
                                      : "text-gray-300",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="pb-4 text-gray-900">
                              {comment.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
