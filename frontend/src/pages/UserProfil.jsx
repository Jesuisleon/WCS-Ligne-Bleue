import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "@components/ErrorAlert";
import { AuthContext } from "../context/AuthContext";

function UserProfil() {
  const navigate = useNavigate();

  const { VITE_BACKEND_URL } = import.meta.env;

  const { userInfos, userToken } = useContext(AuthContext);
  const { userFirstName, userLastName, userEmail } = userInfos;
  const email = userInfos.userEmail;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorBadPassword, setErrorBadPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${VITE_BACKEND_URL}/changepassword`,
        {
          password,
          email,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .catch((error) => {
        setErrorBadPassword(true);
        setErrorText(error.response.statusText);
        console.error(error.response.statusText);
        return false;
      })
      .then((response) => {
        if (!response) {
          throw new Error("la connection a échoué");
        }
        if (response) {
          navigate("/login");
        }
      });
  };

  // const handleClick = () => {
  //   navigate("/userprofil/changepassword");
  // };

  const btn =
    password === "" || newPassword !== confirmPassword ? (
      <button
        type="submit"
        disabled
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Changer le mot de passe
      </button>
    ) : (
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Changer le mot de passe
      </button>
    );

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
          <h5 className="mb-1 text-xl font-medium text-gray-700 dark:text-white">
            {userFirstName} {userLastName}
          </h5>
          <span className="text-sm text-gray-700 dark:text-gray-200 mb-6">
            {userEmail}
          </span>

          <h1 className="dark:text-white mt-4">
            Changer votre mot de passe :{" "}
          </h1>

          <div className="mt-4 ml-8">
            <form onSubmit={handleSubmit}>
              {errorBadPassword && <ErrorAlert alertMessage={errorText} />}
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  name="floating_password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mot de passe actuel
                </label>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  name="floating_password"
                  id="newpassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nouveau mot de passe
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  name="repeat_password"
                  id="floating_repeat_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirmer le mot de passe
                </label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6" />
              {btn}
            </form>

            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
