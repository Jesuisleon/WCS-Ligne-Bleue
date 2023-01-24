import React, { useState, useContext } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import ErrorAlert from "@components/ErrorAlert";
import { AuthContext } from "../context/AuthContext";
import logoPoste from "../../public/image/logo_la_poste.png";

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
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Continuer
      </button>
    ) : (
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continuer
      </button>
    );

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logoPoste}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Changement de mot de passe
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            {errorBadPassword && <ErrorAlert alertMessage={errorText} />}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="floating_password" className="sr-only">
                  Mot de passe actuel
                </label>
                <input
                  id="password"
                  name="floating_password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe actuel"
                />
              </div>
              <div>
                <label htmlFor="floating_password" className="sr-only">
                  Nouveau mot de passe
                </label>
                <input
                  id="newpassword"
                  name="floating_password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nouveau mot de passe"
                />
              </div>

              <div>
                <label htmlFor="floating_repeat_password" className="sr-only">
                  Confirmer mot de passe
                </label>
                <input
                  id="floating_repeat_password"
                  name="repeat_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmer mot de passe"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/home"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Retour à la page d'acceuil
                </Link>
              </div>
            </div>

            <div>{btn}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
