import { useState } from "react";

import ModalDelete from "@components/notifications/modalDelete";

import {
  HiOutlineTrash,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi";

export default function ToolBar({
  type,
  stepIndex,
  lastStepIndex,
  setPreview,
  preview,
  moveStep,
  close,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="bg-white px-4 py-3 sm:px-6 rounded-t-xl">
      <ModalDelete
        open={openModal}
        setOpen={() => setOpenModal(false)}
        title="Supprimer"
        message="Souhaitez vous vraiment supprimer définitivement ce contenue ?"
        nextStep={close}
      />
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2 ">
          <h3 className="text-md leading-6 font-medium text-gray-400 first-letter:capitalize">
            {type}
          </h3>
        </div>

        <div className="ml-4 mt-2 flex-shrink-0 space-x-2">
          {type !== "image" && type !== "video" && (
            <button
              onClick={() => setPreview()}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
            >
              {preview ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
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
              )}
            </button>
          )}

          <button
            disabled={stepIndex === 0}
            type="button"
            onClick={() => moveStep("up")}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <HiOutlineChevronUp
              color={stepIndex === 0 ? "white" : "gray"}
              size={17}
            />
          </button>
          <button
            disabled={stepIndex === lastStepIndex}
            type="button"
            onClick={() => moveStep("down")}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <HiOutlineChevronDown
              color={stepIndex === lastStepIndex ? "white" : "gray"}
              size={17}
            />
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setOpenModal(true)}
          >
            <HiOutlineTrash color="red" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
