import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";

export default function Alerts({ title, message, show }) {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="rounded-md bg-red-50 p-4 ">
            <div className="flex">
              <div className="flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{title}</h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{message}</li>
                  </ul>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
