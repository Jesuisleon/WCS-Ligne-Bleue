import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function UserProfil() {
  const { userInfos } = useContext(AuthContext);
  const { userFirstName, userLastName, userEmail } = userInfos;

  return (
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
  );
}

export default UserProfil;
