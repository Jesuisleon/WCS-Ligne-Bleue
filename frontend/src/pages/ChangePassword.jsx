import React, { useState, useContext } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import ErrorAlert from "@components/ErrorAlert";
import { AuthContext } from "../context/AuthContext";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfos } = useContext(AuthContext);
  const [errorBadPassword, setErrorBadPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const email = userInfos.userEmail;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/changepassword`, {
        password,
        email,
        newPassword,
      })
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
          navigate("/userprofile");
        }
      });
  };

  const btn =
    password === "" || newPassword !== confirmPassword ? (
      <button
        type="submit"
        disabled
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Envoyez
      </button>
    ) : (
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Envoyez
      </button>
    );

  return (
    <div className="mt-10 ml-8">
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirmer le mot de passe
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6" />
        {btn}
      </form>

      <div />
    </div>
  );
}
