import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import filterTutorialByThemeId from "../services/filterTutorialByThemeId";

function UserProfil() {
  const { userInfos } = useContext(AuthContext);
  const { userFirstName, userLastName, userEmail } = userInfos;
  const [tutorials, setTutorials] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [themFilters, setThemeFilters] = useState("");


  useEffect(() => {
    const theme = [];
    const { VITE_BACKEND_URL } = import.meta.env;
    axios
      .get(`${VITE_BACKEND_URL}/home`)
      .then((response) => {
        response.data.map((e) =>
          theme.push({ id: e.id, value: e.name, isChecked: false })
        );
      })
      .then(() => {
        axios.get(`${VITE_BACKEND_URL}/tutorials`).then((res) => {
          setTutorials(res.data);
          setIsLoading(false);
        });
      });
    setThemeFilters(theme);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (index) => {
    const newOptions = [...themFilters];
    newOptions[index].isChecked = !newOptions[index].isChecked;
    setThemeFilters(newOptions);
  };

  return (
    <div>
      <div className=" flex justify-center items-center mt-12">
        <div className="w-full max-w-sm  rounded-md shadow-md dark:bg-[#3B6CC8] dark:border-gray-700 shadow-yellow-700 ">
          <div className="flex justify-end px-4 pt-4" />
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/image/pigeon-voyageur.png"
              alt="img"
            />
            <h1 className="mb-3 text-xl font-medium text-gray-700 dark:text-white">
              {" "}
              Mes informations personnelles:
            </h1>
            <h5 className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Prénom: {userFirstName}
            </h5>
            <h5 className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Nom: {userLastName}
            </h5>
            <span className="text-sm text-gray-700 dark:text-gray-100 mb-6">
              Adresse mail : {userEmail}
            </span>

            <Link
              to="/userprofil/changepassword"
              className="dark:text-white mt-4"
            >
              Changer votre mot de passe
            </Link>
          </div>
        </div>
      </div>

      {!isLoading && (
        <div className="flex-col">
          <div>
            <button onClick={toggleDropdown}>Select options</button>
            {isOpen && (
              <ul>
                {themFilters.map((themfilter, index) => (
                  <li key={themfilter.value}>
                    <input
                      type="checkbox"
                      checked={themfilter.isChecked}
                      onChange={() => handleOptionChange(index)}
                    />
                    <label>{themfilter.value}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full justify-center text-center mt-10">
            <h1>Mon parcours</h1>
            <ul>
              {themFilters
                .filter((e) => e.isChecked === true)
                .map((e) => (
                  <li key={e.id} className="bg-slate-400">
                    {e.value}
                    <ul>
                      {" "}
                      {filterTutorialByThemeId(e.id, tutorials).map((a) => (
                        <div
                          key={a.id}
                          className="bg-red-200 flex justify-between"
                        >
                          <h1>{a.title}</h1>
                          <Link to={`/tutorial/${a.id}`}>
                            faire le tutoriel
                          </Link>
                          <h1>validé</h1>
                        </div>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfil;
