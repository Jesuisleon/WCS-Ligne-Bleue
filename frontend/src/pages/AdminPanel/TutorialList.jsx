import * as ReactRouter from "react-router-dom";
import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import regexDate from "../../services/utils/utilFunctions";

const { Link } = ReactRouter;

export default function TutorialList({
  adminThemes,
  render,
  setCommentTutoId,
  setOpen,
}) {
  const [data, setData] = useState();
  const [tutoList, setTutoList] = useState();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    axios
      .get(`/tutorials-rating`)
      .then((response) => {
        setData(response.data);
        setTutoList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refreshList]);

  const publishTutorial = (publish, tutoId) => {
    axios
      .put(`/tutorials-published/${tutoId}`, publish)
      .then(() => {
        setRefreshList(!refreshList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // eslint-disable-next-line consistent-return
  const filterTuto = (tuto) => {
    let themeId = [];
    themeId = adminThemes.map((e) => themeId.push(e.id));
    if (adminThemes[themeId.indexOf(tuto.theme_id)].isChecked) {
      return true;
    }
  };

  useEffect(() => {
    if (adminThemes && data) {
      let filteredTuto = data;
      filteredTuto = filteredTuto.filter((tuto) => filterTuto(tuto));
      setTutoList([...filteredTuto]);
    }
  }, [adminThemes, render]);

  const handleCommentList = (id) => {
    setCommentTutoId(id);
    setOpen(true);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Liste des tutoriels
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Link className="" to="/createTutorial">
              {" "}
              <p>Ajouter un Tutoriel</p>
            </Link>
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <button type="button" className="group inline-flex">
                        Thème
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        Tutoriel
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        En ligne
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        Crée le:
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        Modifié le:
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        Commentaires:
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button type="button" className="group inline-flex">
                        Avis:
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <HiChevronDown
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tutoList &&
                    tutoList.map((dataTuto) => (
                      <tr key={dataTuto.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {dataTuto.theme_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dataTuto.title}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                          <button
                            type="submit"
                            onClick={() =>
                              publishTutorial(
                                { published: !dataTuto.published },
                                dataTuto.id
                              )
                            }
                            className={`${
                              dataTuto.published
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                          >
                            {dataTuto.published ? "En ligne" : "hors ligne"}
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {regexDate(dataTuto.creation_date)}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {regexDate(dataTuto.edition_date)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            type="button"
                            onClick={() => handleCommentList(dataTuto.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Afficher
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {dataTuto.rating
                            ? Math.round(dataTuto.rating * 100) / 100
                            : "-"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/createTutorial/${dataTuto.id}`}
                            className="text-blue-600 hover:text-blue-900 px-3"
                          >
                            Modifier
                          </Link>
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Link
                              className=""
                              to={`/theme/${dataTuto.theme_id}/tutorial/${dataTuto.id}`}
                            >
                              {" "}
                              <p>Afficher</p>
                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
