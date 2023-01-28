import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Tabs() {
  return (
    <div>
      <div className="sm:hidden">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className=" hover:border-blue-500 border-transparent hover:text-blue-600 text-gray-500 group inline-flex gap-2 items-center py-4 px-1 border-b-2 font-medium text-sm">
              <span>Filtrer les tutoriels</span>
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-10  absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none text-gray-800">
              <div className="flex flex-col divide-x ">
                <div className="relative flex items-start px-4 py-2 hover:bg-gray-100">
                  <div className="min-w-0 flex-1 text-base ">
                    <label
                      htmlFor="all"
                      className="font-medium text-gray-700 select-none"
                    >
                      Tutoriels à découvrir
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="all"
                      value=""
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="relative flex items-start px-4 py-2 hover:bg-gray-100">
                  <div className="min-w-0 flex-1 text-base ">
                    <label
                      htmlFor="all"
                      className="font-medium text-gray-700 select-none"
                    >
                      Tutoriels validés
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id="all"
                      value=""
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="hidden sm:block">
        <div>
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <div className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-500 group inline-flex gap-2 items-center py-4 px-1 border-b-2 font-medium text-sm">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
              <span>Tutoriels validés</span>
            </div>
            <div className="border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-500 group inline-flex gap-2 items-center py-4 px-1 border-b-2 font-medium text-sm">
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
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              <span>Tutoriels à découvrir</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
