import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import ErrorAlert from "@components/notifications/ErrorAlert";
import { RiMailLockFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { setUserTokenCookie, setUserInfos, setUserJourney } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/login`, {
        email,
        password,
      })
      .catch((error) => {
        setErrorMessage(true);
        setErrorText(error.response.data);
        console.error(error);
      })
      .then((response) => {
        if (!response) {
          throw new Error("La connection a échoué");
        }
        if (response.data.token) {
          setUserTokenCookie(response.data.token);
          setUserInfos({
            userId: response.data.user.id,
            userFirstName: response.data.user.firstname,
            userLastName: response.data.user.lastname,
            userEmail: response.data.user.email,
            isAdmin: response.data.user.admin,
          });
          axios
            .get(`/journeys-validation/${response.data.user.id}`)
            .then((res) => {
              setUserJourney(res.data);
            });
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/image/logo_la_poste.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connecte-toi
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{" "}
              <Link
                to="/home"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                commence les tutoriels directement
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                {errorMessage && <ErrorAlert alertMessage={errorText} />}
                <label htmlFor="email-address" className="sr-only">
                  Adresse email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse mail"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <RiMailLockFill
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Se connecter
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center justify-center text-sm">
            <span className="px-2 text-gray-600">
              Vous n'êtes pas membre de ligne Bleue ?
            </span>
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Cliquez ici pour créer un compte.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
