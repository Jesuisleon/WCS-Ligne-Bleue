import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UserProfil() {
  const { userFirstName, userLastName, userEmail } = useContext(AuthContext);

  return (
    <div className=" flex justify-center items-center mt-12">
      <div className="w-full max-w-sm  rounded-full shadow-md dark:bg-blue-800 dark:border-gray-700 shadow-yellow-700 ">
        <div className="flex justify-end px-4 pt-4" />
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/image/pigeon-voyageur.png"
            alt="img"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-700 dark:text-white">
            {userFirstName} {userLastName}
          </h5>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {userEmail}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
