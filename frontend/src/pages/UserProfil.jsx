import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UserProfil() {
  const { userFirstName, userLastName, userEmail } = useContext(AuthContext);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center font-medium text-blue-800 mb-80">
        <div className="text-xl">{userFirstName}</div>

        <div className="text-xl">{userLastName}</div>

        <div className="text-xl">{userEmail}</div>
      </div>
    </div>
  );
}

export default UserProfil;
